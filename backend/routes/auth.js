import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import bcrypt from 'bcrypt'; // might be better to use argon2
import jwt from 'jsonwebtoken';
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'placeholder';

export const checkUserWithToken = (req) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return { authenticated: false, user: null };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { authenticated: true, user: decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return { authenticated: false, user: null };
  }
};

router.post('/register', async function (req, res) {
  console.log(JWT_SECRET);
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
    await userRepository.insert(newUser);

    return res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error('/auth/register error:', error);
    res.status(500).json({ message: 'registration error' });
  }
});

router.post('/login', async function (req, res) {
  try {
    console.log('coucou');
    const { username, password } = req.body;
    // authentification
    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });
    // on ne distingue pas les pb de mdp ou d'username !
    // en vrai avec register on peut savoir quels sont les usernames existants mais bon
    const validPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!validPassword) {
      return res.status(400).json({ message: 'Wrong username/password' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '48h' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: 178800000,
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: 'Logged in',
    });
  } catch (error) {
    console.error('/auth/login error:', error);
    return res.status(500).json({ message: 'login error' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('auth_token');
  return res.status(200).json({ message: 'Logged out' });
});

router.get('/checkauth', (req, res) => {
  const { authenticated, user } = checkUserWithToken(req);
  return res.json({
    authenticated: authenticated,
    user: authenticated ? { username: user.username } : null,
  });
});

export default router;
