import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { username },
      select: ['id', 'username'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
