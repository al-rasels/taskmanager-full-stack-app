import React, { useEffect, useRef } from "react";
import {
  GetProfileRequest,
  UpdateProfileRequest,
} from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import FormHelper from "../../helper/FormHelper";
const Profile = () => {
  useEffect(() => {
    GetProfileRequest();
  }, []);
  // refs for form fields
  const refs = {
    emailRef: useRef(),
    firstNameRef: useRef(),
    lastNameRef: useRef(),
    photoRef: useRef(),
    mobileRef: useRef(),
    passwordRef: useRef(),
    userImgViewRef: useRef(),
  };
  // update profile function
  const UpdateMyProfile = (e) => {
    e.preventDefault();
    const userData = {
      email: refs.emailRef.value,
      firstName: refs.firstNameRef.value,
      lastName: refs.lastNameRef.value,
      mobile: refs.mobileRef.value,
      password: refs.passwordRef.value,
      photo: refs.userImgViewRef.src,
    };
    if (!FormHelper.isEmail(userData.email)) {
      FormHelper.errorToast("Valid Email Address Required!");
    } else if (FormHelper.isEmpty(userData.firstName)) {
      FormHelper.errorToast("First Name Required!");
    } else if (FormHelper.isEmpty(userData.lastName)) {
      FormHelper.errorToast("Last Name Required!");
    } else if (!FormHelper.isMobile(userData.mobile)) {
      FormHelper.errorToast("Valid Mobile Number is Required !");
    } else if (FormHelper.isEmpty(userData.password)) {
      FormHelper.errorToast("Password Required!");
    } else if (refs.photoRef.files[0]) {
      if (!FormHelper.isValidImageFile(refs.photoRef.files[0])) {
        FormHelper.errorToast("Valid Profile Picture is Required !");
      }
    } else {
      // send update profile request
      UpdateProfileRequest(userData).then((result) => {
        if (result !== false) {
          FormHelper.successToast("Profile updated successfully!");
        } else {
          FormHelper.errorToast("Failed to update profile!");
        }
      });
    }
  };

  const previewImage = (e) => {
    // check if file is valid image type

    FormHelper.toBase64(e.target.files[0]).then((base64Image) => {
      refs.userImgViewRef.src = base64Image;
    });
  };

  const ProfileData = useSelector((state) => state.profile.value);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid d-block text-center">
                <img
                  ref={(input) => (refs.userImgViewRef = input)}
                  src={ProfileData.photo}
                  alt="Profile"
                  className="rounded-circle p-3 img-thumbnail mb-2 animate__animated animate__fadeIn"
                />
                <hr className="my-4" />
                <div className="row">
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    <label htmlFor="photoRef">Profile Picture</label>
                    <input
                      onChange={previewImage}
                      ref={(input) => (refs.photoRef = input)}
                      type="file"
                      className="form-control animate__animated animate__fadeInUp"
                      id="photoRef"
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    {" "}
                    <label htmlFor="emailRef">Email Address</label>
                    <input
                      readOnly={true}
                      defaultValue={ProfileData.email}
                      disabled={true}
                      placeholder="Email Address"
                      ref={(input) => (refs.emailRef = input)}
                      type="email"
                      className="form-control animate__animated animate__fadeInUp"
                      id="emailRef"
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    {" "}
                    <label htmlFor="firstNameRef">First Name</label>
                    <input
                      defaultValue={ProfileData.firstName}
                      placeholder="First Name"
                      ref={(input) => (refs.firstNameRef = input)}
                      type="text"
                      className="form-control animate__animated animate__fadeInUp"
                      id="firstNameRef"
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    {" "}
                    <label htmlFor="lastNameRef">Last Name</label>
                    <input
                      defaultValue={ProfileData.lastName}
                      placeholder="Last Name"
                      ref={(input) => (refs.lastNameRef = input)}
                      type="text"
                      className="form-control animate__animated animate__fadeInUp"
                      id="lastNameRef"
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    {" "}
                    <label htmlFor="mobileRef">Mobile </label>
                    <input
                      defaultValue={ProfileData.mobile}
                      ref={(input) => (refs.mobileRef = input)}
                      type="number"
                      className="form-control animate__animated animate__fadeInUp"
                      id="mobileRef"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    {" "}
                    <label htmlFor="passwordRef">Password</label>
                    <input
                      defaultValue={ProfileData.password}
                      ref={(input) => (refs.passwordRef = input)}
                      type="password"
                      className="form-control animate__animated animate__fadeInUp"
                      id="passwordRef"
                      placeholder="Password"
                      // on active make password visible
                      onFocus={(e) => (e.target.type = "text")}
                      onBlur={(e) => (e.target.type = "password")}
                    />
                  </div>
                  <div className="col-4 p-2 animate__animated animate__fadeInUp">
                    <button
                      onClick={UpdateMyProfile}
                      className="btn custom-btn-primary form-control mt-4 animate__animated animate__fadeInUp">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
