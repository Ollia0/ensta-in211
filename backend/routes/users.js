import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { checkUserWithToken } from './auth.js';

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

router.put('/profile', async (req, res) => {
  const { authenticated, user } = checkUserWithToken(req);
  if (!authenticated) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    const { description, profilePicture } = req.body;
    const userRepository = appDataSource.getRepository(User);

    await userRepository.update(user.id, {
      description: description,
      profilePicture: profilePicture,
    });

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
