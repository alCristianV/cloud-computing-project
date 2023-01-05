import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Post } from '../Post/Post';

export interface PostListProps {
  userName: string;
}

export const PostList = (props: PostListProps) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const requestOptions = {
      method: 'GET',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      'http://104.40.210.67:3001/api/v1/posts',
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return false;

    setPosts(responseStatus.data.posts);

    toast.success('Successfully refreshed posts');

    return true;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchComments = async (postId: string) => {
    const requestOptions = {
      method: 'GET',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      `http://104.40.210.67:3003/api/v1/comments/post/${postId}`,
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return;

    return responseStatus.data.comments;
  };

  const addComment = async (postId: string, commentBody: string) => {
    const requestOptions = {
      method: 'POST',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: postId,
        body: commentBody,
        userName: props.userName,
      }),
    };
    const response = await fetch(
      `http://104.40.210.67:3003/api/v1/comments`,
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return false;

    toast.success('Successfully commented');

    return true;
  };

  const getPostLikesNumber = async (postId: string) => {
    const requestOptions = {
      method: 'GET',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      `http://104.40.210.67:3002/api/v1/likes/post/${postId}`,
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return 0;

    return responseStatus.data.likesNumber;
  };

  const like = async (postId: string) => {
    const requestOptions = {
      method: 'POST',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: postId,
        userName: props.userName,
      }),
    };
    const response = await fetch(
      `http://104.40.210.67:3002/api/v1/likes`,
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return;

    toast.success('Successfully liked');
  };

  const deletePost = async (postId: string) => {
    const requestOptions = {
      method: 'DELETE',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      `http://104.40.210.67:3001/api/v1/posts/${postId}`,
      requestOptions
    );
    const responseStatus = await response.json();
    console.log(responseStatus);
    if (responseStatus.status === 'fail') return;

    toast.success('Successfully deleted');
  };

  return (
    <>
      <button onClick={fetchPosts} className="btn btn-primary">
        {'Refresh'}
      </button>
      {posts.map((post: any) => {
        return (
          <Post
            key={post._id}
            username={post.ownerUsername}
            title={post.title}
            body={post.body}
            deleteButton={post.ownerUsername === props.userName}
            deletePost={() => deletePost(post._id)}
            like={() => like(post._id)}
            getPostLikesNumber={() => getPostLikesNumber(post._id)}
            fetchComments={() => fetchComments(post._id)}
            addComment={(body: string) => addComment(post._id, body)}
          />
        );
      })}
    </>
  );
};
