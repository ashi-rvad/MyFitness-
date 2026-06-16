import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ override: true });

const getModel = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
};

export const generateWorkoutPlan = async (profile) => {
  const prompt = `You are an expert AI fitness coach. Create a structured weekly workout plan for the following user:
Age: ${profile.age}
Weight: ${profile.weight}kg
Height: ${profile.height}cm
Fitness Goal: ${profile.fitnessGoal}
Activity Level: ${profile.activityLevel}

Return the response STRICTLY as a JSON object with this exact structure:
{
  "name": "Plan Name",
  "goal": "...",
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "Chest and Triceps",
      "exercises": [
        { "name": "Pushups", "sets": 3, "reps": "10-15", "rest": "60s" }
      ]
    }
  ]
}
Do not include any other text or markdown block markers outside the JSON.`;

  try {
    const result = await getModel().generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.warn("Gemini API Error (Using fallback mock):", error.message);
    return {
      name: "AI Adaptive Plan (Fallback)",
      goal: profile.fitnessGoal || "General Fitness",
      weeklySchedule: [
        {
          day: "Monday",
          focus: "Full Body Strength",
          exercises: [
            { name: "Squats", sets: 3, reps: "10", rest: "60s" },
            { name: "Pushups", sets: 3, reps: "12", rest: "60s" },
            { name: "Plank", sets: 3, reps: "30s", rest: "30s" }
          ]
        },
        {
          day: "Wednesday",
          focus: "Cardio & Core",
          exercises: [
            { name: "Running", sets: 1, reps: "20 min", rest: "None" },
            { name: "Crunches", sets: 3, reps: "15", rest: "45s" }
          ]
        },
        {
          day: "Friday",
          focus: "Active Recovery",
          exercises: [
            { name: "Yoga Flow", sets: 1, reps: "20 min", rest: "None" }
          ]
        }
      ]
    };
  }
};

export const generateDietPlan = async (profile) => {
  const prompt = `You are an expert AI nutritionist. Create a structured daily diet plan for the following user:
Weight: ${profile.weight}kg
Fitness Goal: ${profile.fitnessGoal}
Activity Level: ${profile.activityLevel}

Return the response STRICTLY as a JSON object with this exact structure:
{
  "goal": "...",
  "totalDailyCalories": 2000,
  "macros": { "protein": 150, "carbs": 200, "fats": 65 },
  "meals": {
    "breakfast": [{ "food": "Oatmeal", "calories": 300, "protein": 10, "carbs": 50, "fats": 5 }],
    "lunch": [...],
    "dinner": [...],
    "snacks": [...]
  },
  "waterIntake": 2.5
}
Do not include any other text or markdown block markers outside the JSON.`;

  try {
    const result = await getModel().generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.warn("Gemini API Error (Using fallback mock):", error.message);
    return {
      goal: profile.fitnessGoal || "Healthy Living",
      totalDailyCalories: 2200,
      macros: { protein: 140, carbs: 220, fats: 70 },
      meals: {
        breakfast: [{ food: "Oatmeal with berries", calories: 350, protein: 12, carbs: 60, fats: 8 }],
        lunch: [{ food: "Chicken salad", calories: 450, protein: 40, carbs: 20, fats: 15 }],
        dinner: [{ food: "Salmon and rice", calories: 550, protein: 35, carbs: 50, fats: 20 }],
        snacks: [{ food: "Protein shake", calories: 200, protein: 25, carbs: 10, fats: 2 }]
      },
      waterIntake: 3.0
    };
  }
};

export const chatWithCoachStream = async (message, history) => {
  try {
    const chat = getModel().startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    return await chat.sendMessageStream(message);
  } catch (error) {
    console.warn("Gemini API Error (Using fallback mock stream):", error.message);
    
    // Create a much smarter, context-aware mock response
    let mockText = "";
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("diet") || lowerMsg.includes("nutrition") || lowerMsg.includes("food")) {
      mockText = "For a balanced diet plan, I recommend a 40/30/30 macro split (40% Protein, 30% Carbs, 30% Fats). Start your day with a high-protein breakfast like eggs and oatmeal. For lunch and dinner, focus on lean meats like chicken or fish, paired with complex carbs like sweet potatoes and a large portion of greens! Don't forget to drink at least 3 liters of water daily.";
    } else if (lowerMsg.includes("workout") || lowerMsg.includes("exercise") || lowerMsg.includes("train")) {
      mockText = "A great starting point for workouts is a 3-day Full Body split or a 4-day Upper/Lower split. Focus on compound movements: Squats, Deadlifts, Bench Press, and Pull-ups. Aim for 3-4 sets of 8-12 reps for hypertrophy, and ensure you are progressively overloading each week! Make sure to stretch and warm up properly.";
    } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      mockText = "Hello there! I am your AI Fitness Coach. I can help you build custom workout routines, give you nutritional advice, or answer any questions you have about fitness science! What are your current fitness goals?";
    } else {
      mockText = "That's an interesting point! While my connection to the live AI network is currently restricted by this testing API key, I'm always here to help. Whether you want to focus on weight loss, muscle gain, or endurance, the key is consistency, progressive overload, and a balanced diet. How can I help you with your routine today?";
    }

    const chunks = mockText.match(/.{1,10}/g) || [mockText];
    
    let index = 0;
    return {
      stream: {
        [Symbol.asyncIterator]() {
          return {
            async next() {
              if (index < chunks.length) {
                const text = chunks[index++];
                await new Promise(r => setTimeout(r, 30));
                return { value: { text: () => text }, done: false };
              }
              return { value: undefined, done: true };
            }
          };
        }
      }
    };
  }
};
