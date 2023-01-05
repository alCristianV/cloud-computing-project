import { useEffect, useState } from 'react';
import './Post.css';

interface IPostProps {
  username: string;
  title: string;
  body: string;
  deleteButton: boolean;
  deletePost: () => Promise<void>;
  like: () => Promise<void>;
  getPostLikesNumber: () => Promise<number>;
  fetchComments: () => Promise<any[]>;
  addComment: (body: string) => Promise<boolean>;
}

export const Post = (props: IPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>();
  const [commentText, setCommentText] = useState('');
  const [likesNumber, setLikesNumber] = useState(0);

  useEffect(() => {
    const getPostLikesNumber = async () => {
      const likesNumber = await props.getPostLikesNumber();
      setLikesNumber(likesNumber);
    };
    getPostLikesNumber();
  }, []);

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <span className="postUsername">{props.title}</span>
              <span className="postDate">{props.username}</span>
            </div>
            {props.deleteButton && (
              <button
                className="btn btn-danger btn-sm"
                onClick={props.deletePost}
              >
                Delete
              </button>
            )}
          </div>
          <div className="postCenter">
            <span className="postText">{props.body}</span>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="/assets/like.png"
                onClick={async () => {
                  await props.like();
                }}
                alt=""
              />
              <span className="postLikeCounter">
                {likesNumber} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommenttext"
                onClick={async () => {
                  if (!showComments) {
                    const comments = await props.fetchComments();
                    setComments(comments);
                  }
                  setShowComments(!showComments);
                }}
              >
                {!comments ? 'Load comments' : `${comments.length} comments`}
              </span>
            </div>
          </div>
        </div>
        {showComments && (
          <>
            {comments?.map((comment: any) => {
              return (
                <div key={comment._id}>
                  {comment.userName} : {comment.body}
                </div>
              );
            })}
            <input
              value={commentText}
              onChange={(event) => {
                setCommentText(event.target.value);
              }}
              onKeyDown={async (key) => {
                if (key.key === 'Enter') {
                  await props.addComment(commentText);
                  setCommentText('');
                }
              }}
              className="form-control mt-1"
              placeholder="Enter comment"
            />
          </>
        )}
      </div>
    </>
  );
};
