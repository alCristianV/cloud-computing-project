import axios from 'axios';
import express from 'express';
import Like from '../models/like';

export const getAllPostLikes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postId = req.params.postId;
    const post = await axios.get(
      `http://172.21.16.1:3001/api/v1/posts/${postId}`
    );
    if (post.status !== 200) {
      return res.status(400).json({ status: 'post does not exist' });
    }

    const likes = await Like.find({ postId: postId });
    const likesNumber = likes.length;

    res.status(200).json({ status: 'succes', data: { likesNumber } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const createLike = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postId = req.body.postId;
    const post = await axios.get(
      `http://172.21.16.1:3001/api/v1/posts/${postId}`
    );
    if (post.status !== 200) {
      return res.status(400).json({ status: 'post does not exist' });
    }

    const userName = req.body.userName;
    const user = await axios.get(
      `http://172.21.16.1:3000/api/v1/users/${userName}`
    );
    if (user.status !== 200) {
      return res.status(400).json({ status: 'user does not exist' });
    }

    const like = await Like.create(req.body);
    res.status(200).json({ status: 'succes', data: { like } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const deleteLike = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const like = await Like.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'succes' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};
