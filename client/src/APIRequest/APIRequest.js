import axios from "axios";
import FormHelper from "../helper/FormHelper";

const BASE_URL = "/api/v1";

export function RegistrationRequest(userData) {
  const URl = BASE_URL + "/registration";
  const PostBody = userData;
  PostBody.photo = "";
  return axios
    .post(URl, PostBody)
    .then((res) => {
      if (res.data["status"] == "fail") {
        console.table(res.data);
        if (res.data["message"].includes("E11000")) {
          FormHelper.errorToast("Email Already Exist!");
          return false;
        } else {
          FormHelper.errorToast("Something went wrong!");
        }
      } else {
        FormHelper.successToast("Registration Success!");
      }
    })
    .catch((err) => {
      FormHelper.errorToast("Something went wrong!");
      console.log(err);
      return false;
    });
}
