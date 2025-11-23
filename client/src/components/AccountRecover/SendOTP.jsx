import React, { Fragment, useRef } from "react";
import FormHelper from "../../helper/FormHelper";
import { RecoverVerifyEmailRequest } from "../../APIRequest/APIRequest";
import { useNavigate } from "react-router-dom";
function SendOTP() {
  const emailRef = useRef();
  const navigate = useNavigate();

  const VerifyEmail = () => {
    const email = emailRef.current.value;

    // Send
    if (!FormHelper.isEmail(email)) {
      FormHelper.errorToast("Valid Email Address Required");
    } else {
      RecoverVerifyEmailRequest(email).then((result) => {
        if (result) {
          navigate("/verifyOTP");
        } else {
          FormHelper.errorToast("Password can't be changed something wrong!");
        }
      });
    }
  };

  return (
    <Fragment>
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow p-4 rounded-3">
              <div className="card-body">
                <h4 className="text-center mb-4">EMAIL ADDRESS</h4>

                <label htmlFor="email" className="fw-medium mb-2">
                  Your Email Address
                </label>
                <input
                  ref={(input) => (emailRef.current = input)}
                  className="form-control animate__animated animate__fadeInUp"
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />

                <button
                  onClick={VerifyEmail}
                  className="btn w-100 mt-4 animate__animated animate__fadeInUp custom-btn-primary">
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SendOTP;
