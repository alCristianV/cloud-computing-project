import express from 'express';

export const getSession = (req: express.Request, res: express.Response) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'no session' });
  }
  return res.status(200).json({ status: 'success', data: req.session });
};
