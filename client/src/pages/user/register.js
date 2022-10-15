import React from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function register() {
  return (
    <div className="boss">
      <header className="header">
        <h1>Shopper. </h1>
      </header>
      <div className="Reg-form-container">
        {/* <h1>register</h1> */}
        {/* <ul>
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul> */}
        <div className="form">
          <div className="form-body">
            <h1>Register</h1>
            <div className="username">
              <label className="form__label" for="firstName"></label>
              <input
                placeholder="       First Name
"
                className="form__input"
                type="text"
                id="firstName"
              />
            </div>
            <div className="lastname">
              <label className="form__label" for="lastName">
                {" "}
              </label>
              <input
                placeholder="       Last Name"
                type="text"
                name=""
                id="lastName"
                className="form__input"
              />
            </div>
            <div className="email">
              <label className="form__label" for="email">
                {" "}
              </label>
              <input
                placeholder="       Email"
                type="email"
                id="email"
                className="form__input"
              />
            </div>
            <div className="lastinput">
              {" "}
              <div className="password">
                <label className="form__label" for="password">
                  {" "}
                </label>
                <input
                  placeholder="       Password*"
                  className="form__input"
                  type="password"
                  id="password"
                />
              </div>
              <div className="confirm-password">
                <label className="form__label" for="confirmPassword"></label>
                <input
                  Confirm
                  Password
                  placeholder="       Confirm password*"
                  className="form__input"
                  type="password"
                  id="confirmPassword"
                />
              </div>
            </div>

            <button type="submit" class="btn">
              Register
            </button>
            <div className="footer">
              {" "}
              Already have an account?<Link to="/login"> Sign in now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
