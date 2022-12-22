import express from 'express';
import User from '../models/user';

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const post = await User.findOne({ username: req.params.username });

    if (post) {
      return res.status(200).json({ status: 'succes', data: { post } });
    }
    return res.status(404).json({ status: 'not found' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};
