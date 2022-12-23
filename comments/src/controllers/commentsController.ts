import axios from 'axios';
import express from 'express';
import Comment from '../models/comment';

export const getAllPostComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postId = req.params.postId;
    const post = await axios.get(
      `http://172.28.192.1:3001/api/v1/posts/${postId}`
    );
    if (post.status !== 200) {
      return res.status(400).json({ status: 'post does not exist' });
    }

    const comments = await Comment.find({ postId: postId });

    res.status(200).json({ status: 'succes', data: { comments } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const postId = req.body.postId;
    const post = await axios.get(
      `http://172.28.192.1:3001/api/v1/posts/${postId}`
    );
    if (post.status !== 200) {
      return res.status(400).json({ status: 'post does not exist' });
    }

    const userName = req.body.userName;
    const user = await axios.get(
      `http://172.28.192.1:3000/api/v1/users/${userName}`
    );
    if (user.status !== 200) {
      return res.status(400).json({ status: 'user does not exist' });
    }

    const comment = await Comment.create(req.body);
    res.status(200).json({ status: 'succes', data: { comment } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'succes' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};
