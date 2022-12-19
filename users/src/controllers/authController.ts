import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

export const signUp = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashpassword });
    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch {
    res.status(400).json({ status: 'fail' });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }

    const isCorrect = bcrypt.compare(password, user.password);

    if (isCorrect) {
      res.status(200).json({ status: 'success' });
    } else {
      res
        .status(400)
        .json({ status: 'fail', message: 'incorrect username or password' });
    }
  } catch {
    res.status(400).json({ status: 'fail' });
  }
};
