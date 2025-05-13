import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import bcrypt from 'bcrypt'; // might be better to use argon2
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'placeholder';

router.post('/register', async function (req, res) {
  try {
    const { username, password } = req.body;
    // tous les champs ok ?
    if (!username || !password) {
      return res.status(400).json({ message: 'A field is missing' });
    }
    // username libre ?
    const userRepository = appDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already used' });
    }

    const hashed_pswd = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      username: username,
      password: hashed_pswd,
    });
    userRepository.insert(newUser);

    return res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error('/auth/register error:', error);
    res.status(500).json({ message: 'registration error' });
  }
});

export default router;
