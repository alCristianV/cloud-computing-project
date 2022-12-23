import express from 'express';
import {
  deleteLike,
  createLike,
  getAllPostLikes,
} from '../controllers/likesController';

const router = express.Router();

router.route('/').post(createLike);
router.route('/post/:postId').get(getAllPostLikes);
router.route('/:id').delete(deleteLike);

export default router;
