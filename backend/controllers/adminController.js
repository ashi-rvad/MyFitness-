import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';

// @desc    Get all users with pagination
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const count = await User.countDocuments({});
  const users = await User.find({})
    .select('-password')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    totalUsers: count,
  });
});
