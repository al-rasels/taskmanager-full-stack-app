import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-100 p-4 shadow-md">
              <div className="card-body">
                <h5>Sign In</h5> <br />
                <input
                  type="email"
                  placeholder="User Email"
                  className="form-control  animated fadeInUp"
                  name="email"
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control animated fadeInUp"
                  name="password"
                />
                <br />
                <button className="btn w-100 mb-2 animated fadeInUp float-end custom-btn-primary text-white text-lg">
                  Next
                </button>
                <div className="text-center w-100">
                  <Link
                    className="text-center animated fadeInUp"
                    to="/registration">
                    Sign Up
                  </Link>
                  <br />
                  <Link className="text-center animated fadeInUp" to="/">
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
