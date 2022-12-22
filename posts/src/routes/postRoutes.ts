import express from 'express';
import {
  createPost,
  deletePost,
  getOnePost,
  updatePost,
} from '../controllers/postsController';
import { getAllPosts } from '../controllers/postsController';

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost);

export default router;
