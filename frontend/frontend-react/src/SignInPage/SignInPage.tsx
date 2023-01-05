import './SignInPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInPageProps {
  loginCallback: (username: string, password: string) => Promise<boolean>;
  signUpCallback: (username: string, password: string) => Promise<void>;
}

export const SignInPage = (props: SignInPageProps) => {
  const [type, setType] = useState<'signIn' | 'login'>('login');
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (username: string, password: string) => {
    const success = await props.loginCallback(username, password);
    if (success) {
      navigate('/posts');
    }
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {type === 'signIn' ? 'Sign In' : 'Login'}
          </h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={() => {
                type === 'login'
                  ? login(username, password)
                  : props.signUpCallback(username, password);
              }}
              className="btn btn-primary"
            >
              {type === 'login' ? 'Login' : 'Register'}
            </button>
          </div>
          {type === 'login' ? (
            <div
              className="forgot-password text-right mt-2"
              onClick={() => {
                setType('signIn');
              }}
            >
              Don't Have an Account?
            </div>
          ) : (
            <div
              className="forgot-password text-right mt-2"
              onClick={() => {
                setType('login');
              }}
            >
              Go back to Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
