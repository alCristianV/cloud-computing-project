import express from 'express';
import {
  createPost,
  deletePost,
  getAllUserPosts,
  getOnePost,
  updatePost,
  getAllPosts,
} from '../controllers/postsController';

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost);
router.route('/user/:ownerUsername').get(getAllUserPosts);

export default router;
