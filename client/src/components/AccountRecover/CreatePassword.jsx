import React, { useRef } from "react";
import FormHelper from "../../helper/FormHelper";
import { ChangePasswordRequest } from "../../APIRequest/APIRequest";
import { getEmail, getOTP } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const navigate = useNavigate();
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();
  const email = getEmail();
  const OTP = getOTP();
  const ResetPassword = () => {
    const password = PasswordRef.current.value;
    const confirmPassword = ConfirmPasswordRef.current.value;
    if (!FormHelper.isEmpty(password)) {
      FormHelper.errorToast("Please enter a password");
    } else if (!FormHelper.isEmpty(confirmPassword)) {
      FormHelper.errorToast("Please confirm your password");
    } else if (password !== confirmPassword) {
      FormHelper.errorToast("Password did not matched !");
    } else {
      ChangePasswordRequest(email.OTP, password).then((result) => {
        if (result) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-6 center-screen">
          <div className="card w-100 p-4">
            <div className="card-body px-5 text-start ">
              <h4 className="text-center">SET NEW PASSWORD</h4>
              <br />
              <label id="email" htmlFor="email">
                Your email address
              </label>
              <input
                value={email}
                readOnly={true}
                type="email"
                placeholder="User Email"
                className="form-control animate__animated animate__fadeInUp"
              />
              <br />
              <label htmlFor="new-password">New Password</label>
              <input
                onChange={(input) => (PasswordRef.current = input)}
                type="password"
                name="new-password"
                id="new-password"
                className="form-control animate__animated animate__fadeInUp"
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                onChange={(input) => (ConfirmPasswordRef.current = input)}
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="form-control animate__animated animate__fadeInUp"
              />
              <br />
              <button
                onClick={ResetPassword}
                className="btn w-100 animate__animated animate__fadeInUp float-end custom-btn-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
