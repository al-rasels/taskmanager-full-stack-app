import React, { useEffect } from "react";
import { GetProfileRequest } from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
const Profile = () => {
  useEffect(() => {
    GetProfileRequest();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);
  console.log(ProfileData);
  return <div>Profile</div>;
};

export default Profile;
