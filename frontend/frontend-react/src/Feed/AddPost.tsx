import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface AddPostProps {
  userName: string;
}

export const AddPost = (props: AddPostProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userName) navigate('/login');
  }, []);

  const addPost = async () => {
    const requestOptions = {
      method: 'POST',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerUsername: props.userName,
        title: title,
        body: body,
      }),
    };
    const response = await fetch(
      'http://172.24.80.1:3001/api/v1/posts',
      requestOptions
    );
    const responseStatus = await response.json();
    if (responseStatus.status === 'fail') return false;

    toast.success('Successfully added a new post');

    return true;
  };

  return (
    <div className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Add Post</h3>
        <p>Username : {props.userName}</p>
        <div className="form-group mt-3">
          <label>Title</label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="form-control mt-1"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group mt-3">
          <label>Body</label>
          <textarea
            onChange={(event) => {
              setBody(event.target.value);
            }}
            className="form-control mt-1"
            placeholder="Enter body"
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={addPost} className="btn btn-primary">
            {'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};
