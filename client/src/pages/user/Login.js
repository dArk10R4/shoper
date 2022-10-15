import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
export default function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget.elements);
    await fetch();
  }
  return (
    <div className="Auth-form-container">
      {/* loginpage
      <ul>
        <li>
          {" "}
        
        </li>

        <li>
          
        </li>
      </ul> */}
      <div className="logo_side">
        <h1>Shopper. </h1>
      </div>
      <div className="login_side">
        <div className="login-container">
          <form method="post" onSubmit={handleSubmit}>
            <div className="input-container">
              <h1>Sign In</h1>
              <fieldset className="mail">
                {/* <label>Username or Email Address </label> */}
                <input
                  type="text"
                  name="uname"
                  required
                  placeholder="      Email Address *"
                />
              </fieldset>
              <fieldset className="pasword">
                {/* <label>Password </label> */}
                <input
                  type="password"
                  name="pass"
                  required
                  placeholder="      Password *"
                />
              </fieldset>
            </div>
            <div className="Checkboxx">
              <div className="Check_inp">
                {" "}
                <input className="checint" type="checkbox" />
                <p>Remember me</p>
              </div>
              <a className="forgot" href="/">
                Forgot password?
              </a>
            </div>
            <div className="button_container">
              <input className="button" type="submit" value="Sing In" />
            </div>
            <div className="member">
              Not a member?<Link to="/register"> Sign up now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
