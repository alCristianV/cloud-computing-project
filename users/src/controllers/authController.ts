import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';

import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const signUp = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashpassword });
    req.session.user = newUser;
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
      return;
    }

    const isCorrect = bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({ status: 'success' });
    } else {
      res
        .status(400)
        .json({ status: 'fail', message: 'incorrect username or password' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};
