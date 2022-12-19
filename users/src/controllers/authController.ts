import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

export const signUp = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({ username, password: hashpassword });
    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch {
    res.status(400).json({ status: 'fail' });
  }
};
