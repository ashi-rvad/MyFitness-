import { generateWorkoutPlan, generateDietPlan, chatWithCoachStream } from '../services/aiService.js';
import User from '../models/User.js';
import ChatHistory from '../models/ChatHistory.js';

// @desc    Generate AI Workout Plan
// @route   POST /api/ai/workout
// @access  Private
export const getAiWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plan = await generateWorkoutPlan(user);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate AI Diet Plan
// @route   POST /api/ai/diet
// @access  Private
export const getAiDiet = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plan = await generateDietPlan(user);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Chat with AI Coach (Stream)
// @route   POST /api/ai/chat
// @access  Private
export const getAiChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    // Fetch history
    let chatHistory = await ChatHistory.findOne({ user: userId });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({ user: userId, messages: [] });
    }

    const formattedHistory = chatHistory.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    // SSE Setup
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const resultStream = await chatWithCoachStream(message, formattedHistory);

    let fullResponse = '';
    for await (const chunk of resultStream.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      // Write the chunk to the client
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }

    // Save to history after stream is complete
    chatHistory.messages.push({ role: 'user', content: message });
    chatHistory.messages.push({ role: 'model', content: fullResponse });
    await chatHistory.save();

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error(error);
    // If headers are not sent, we can send a 500, else we end the stream
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};
