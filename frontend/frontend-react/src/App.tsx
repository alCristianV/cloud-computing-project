import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AddPost } from './Feed/AddPost';
import { PostList } from './Feed/PostList';
import { SignInPage } from './SignInPage/SignInPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedUserName, setLoggedUserName] = useState('');

  const login = async (userName: string, password: string) => {
    const requestOptions = {
      method: 'POST',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password: password }),
    };
    const response = await fetch(
      'http://172.24.80.1:3000/api/v1/users/auth/login',
      requestOptions
    );
    const responseStatus = await response.json();
    if (responseStatus.status === 'fail') return false;

    setLoggedUserName(userName);

    toast.success('Successfully logged in');

    return true;
  };

  const signUp = async (userName: string, password: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password: password }),
    };
    const response = await fetch(
      'http://172.24.80.1:3000/api/v1/users/auth/signUp',
      requestOptions
    );
    const responseStatus = await response.json();
    if (responseStatus.status === 'fail') return;

    toast.success('Successfully signUp');
  };

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/login"
              element={
                <SignInPage loginCallback={login} signUpCallback={signUp} />
              }
            />
            <Route
              path="/posts"
              element={
                <>
                  <AddPost userName={loggedUserName} />
                  <PostList userName={loggedUserName} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
