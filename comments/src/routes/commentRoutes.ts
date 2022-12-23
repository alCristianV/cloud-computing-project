import express from 'express';
import {
  getAllPostComments,
  createComment,
  deleteComment,
} from '../controllers/commentsController';

const router = express.Router();

router.route('/').post(createComment);
router.route('/post/:postId').get(getAllPostComments);
router.route('/:id').delete(deleteComment);

export default router;
