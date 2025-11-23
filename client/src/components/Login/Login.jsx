import React, { Fragment, useRef } from "react";
import { Form, Link } from "react-router-dom";
import FormHelper from "../../helper/FormHelper";
import { LoginRequest } from "../../APIRequest/APIRequest";

const Login = () => {
  const loginRefs = {
    email: useRef(),
    password: useRef(),
  };
  const handleLogin = () => {
    const loginData = {
      email: loginRefs.email.current.value,
      password: loginRefs.password.current.value,
    };
    if (!FormHelper.isEmail(loginData.email)) {
      FormHelper.errorToast("Valid email is required");
    } else if (FormHelper.isEmpty(loginData.password)) {
      FormHelper.errorToast("Password is required");
    } else {
      LoginRequest(loginData).then((result) => {
        if (result !== false) {
          window.location.href = "/";
        } else {
          loginRefs.email.current.value = "";
          loginRefs.password.current.value = "";
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-100 p-4 shadow-md">
              <div className="card-body">
                <h5>Sign In</h5> <br />
                <input
                  ref={(input) => (loginRefs.email.current = input)}
                  type="email"
                  placeholder="User Email"
                  className="form-control  animated fadeInUp"
                  name="email"
                />
                <br />
                <input
                  ref={(input) => (loginRefs.password.current = input)}
                  type="password"
                  placeholder="Password"
                  className="form-control animated fadeInUp"
                  name="password"
                />
                <br />
                <button
                  onClick={handleLogin}
                  className="btn w-100 mb-2 animated fadeInUp float-end custom-btn-primary text-white text-lg">
                  Next
                </button>
                <div className="text-center w-100">
                  <Link
                    className="text-center animated fadeInUp"
                    to="/register">
                    Sign Up
                  </Link>
                  <br />
                  <Link className="text-center animated fadeInUp" to="/sendOTP">
                    Forget Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
