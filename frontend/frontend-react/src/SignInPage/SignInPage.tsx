import "./SignInPage.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"


export const SignInPage =() => {
  const [type, setType] = useState<'signIn' | 'login'>('login')
    return (
        <div className="Auth-form-container">
          <div className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">{type === 'signIn' ? 'Sign In' : 'Login'}</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button onClick={ () =>console.log('buttonCliekd')} className="btn btn-primary">
                  {type === 'login' ? 'Login' : 'Register'}
                </button>
              </div>
              {type === 'login' ?
              <div className="forgot-password text-right mt-2" onClick={() =>{setType('signIn')}}>               
              Don't Have an  Account?
              </div> : 
              <div className="forgot-password text-right mt-2" onClick={() =>{ setType('login')}}>               
              Go back to Login
              </div>}
              
            </div>
          </div>
        </div>
      )
  }