import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import FormHelper from "../../helper/FormHelper";
import { RegistrationRequest } from "../../APIRequest/APIRequest";

const Registration = () => {
  const refs = {
    email: useRef(),
    firstName: useRef(),
    lastName: useRef(),
    mobile: useRef(),
    password: useRef(),
  };
  const handleRegistration = () => {
    const userData = {
      email: refs.email.current.value,
      fistName: refs.firstName.current.value,
      lastName: refs.lastName.current.value,
      mobile: refs.mobile.current.value,
      password: refs.password.current.value,
    };
    if (!FormHelper.isEmail(userData.email)) {
      FormHelper.errorToast("Valid Email Address Required!");
    } else if (FormHelper.isEmpty(userData.fistName)) {
      FormHelper.errorToast("First Name Required!");
    } else if (FormHelper.isEmpty(userData.lastName)) {
      FormHelper.errorToast("Last Name Required!");
    } else if (!FormHelper.isMobile(userData.mobile)) {
      FormHelper.errorToast("Valid Mobile Number is Required !");
    } else if (FormHelper.isEmpty(userData.password)) {
      FormHelper.errorToast("Password Required!");
    } else {
      RegistrationRequest(userData).then((result) => {
        if (result !== false) {
          refs.email.current.value = "";
          refs.firstName.current.value = "";
          refs.lastName.current.value = "";
          refs.mobile.current.value = "";
          refs.password.current.value = "";
        } else {
          console.log("Registration failed");
        }
      });
    }
    console.log("Registration Button Clicked");
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card animated fadeIn w-100 p-3">
              <div className="card-body">
                <h5>Sign Up</h5>
                <br />
                <input
                  ref={(input) => (refs.email.current = input)}
                  type="email"
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                />
                <br />
                <input
                  ref={(input) => (refs.firstName.current = input)}
                  type="text"
                  placeholder="First Name"
                  className="form-control animated fadeInUp"
                />
                <br />
                <input
                  ref={(input) => (refs.lastName.current = input)}
                  type="text"
                  placeholder="Last Name"
                  className="form-control animated fadeInUp"
                />
                <br />
                <input
                  ref={(input) => (refs.mobile.current = input)}
                  type="mobile"
                  placeholder="Mobile"
                  className="form-control animated fadeInUp"
                />
                <br />
                <input
                  ref={(input) => (refs.password.current = input)}
                  type="password"
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                />
                <br />
                <button
                  onClick={handleRegistration}
                  className="btn w-100 float-end custom-btn-primary animated fadeInUp">
                  Next
                </button>
                <div className="text-center w-100">
                  <Link className="text-center " to={"login"}>
                    Sign In
                  </Link>
                  <br />
                  <Link className="text-center " to={"/"}>
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

export default Registration;
