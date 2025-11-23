import React, { Fragment, useState } from "react";
import ReactCodeInput from "react-code-input";
import FormHelper from "../../helper/FormHelper";
import { RecoverVerifyEmailRequest } from "../../APIRequest/APIRequest";
import { getEmail } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const [OTP, SetOTP] = useState();
  const defaultInputStyle = {
    width: "48px",
    margin: "10px",
    height: "48px",
    fontSize: "24px",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: "10px",
    border: "1.6px solid #d0d5dd",
    backgroundColor: "#f9fafb",
    color: "#111827",
    outline: "none",
    transition: "all 0.25s ease",

    // Remove default arrows (Firefox)
    MozAppearance: "textfield",
  };
  const email = getEmail();
  const SubmitOTP = () => {
    console.log(email, OTP);

    if (OTP.length === 6) {
      RecoverVerifyEmailRequest(email, OTP).then((result) => {
        if (result) {
          navigate("/createPassword");
        }
      });
    } else {
      FormHelper.errorToast("Please Enter 6 Digit Code!");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="justify-content-center row">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h5>OTP VERIFICATION</h5>
                <p>
                  A 6 Digit verification code has been sent to your email
                  address
                </p>
                <ReactCodeInput
                  onChange={(value) => {
                    SetOTP(value);
                  }}
                  fields={6}
                  inputStyle={defaultInputStyle}
                  type="number"
                />
                <button
                  onClick={SubmitOTP}
                  className="btn w-100 animate__animated animate__fadeInUp float-end custom-btn-primary">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default VerifyOTP;
