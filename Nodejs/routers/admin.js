import express from 'express';
import User from '../model/User.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/PageListUser', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'win'); 
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error });
  }
});

router.delete('/PageListUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Người dùng đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error });
  }
});

export default router;
