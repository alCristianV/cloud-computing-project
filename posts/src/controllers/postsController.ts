import axios from 'axios';
import express from 'express';
import Post from '../models/post';

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await Post.find();

    res
      .status(200)
      .json({ status: 'succes', results: posts.length, data: { posts } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const getAllUserPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await Post.find({ ownerUsername: req.params.ownerUsername });

    res
      .status(200)
      .json({ status: 'succes', results: posts.length, data: { posts } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const getOnePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({ status: 'succes', data: { post } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const ownerUsername = req.body.ownerUsername;
    const user = await axios.get(
      `http://172.28.192.1:3000/api/v1/users/${ownerUsername}`
    );
    if (user.status !== 200) {
      return res.status(400).json({ status: 'user name does not exist' });
    }

    const post = await Post.create(req.body);
    res.status(200).json({ status: 'succes', data: { post } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const ownerUsername = req.body.ownerUsername;
    const user = await axios.get(
      `http://172.28.192.1:3000/api/v1/users/${ownerUsername}`
    );
    if (user.status !== 200) {
      return res.status(400).json({ status: 'user name does not exist' });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'succes', data: { post } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'succes' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'fail' });
  }
};
