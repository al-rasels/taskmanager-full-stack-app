/*  eslint-disable */

import cogoToast from "cogo-toast";

// Regular Expressions
const EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const OnlyNumberRegx = /^\d+$/;
const validFileExtensions = ["jpg", "jpeg", "png"];
const MobileRegx = /^(?:\+88|0088)?01[3-9]\d{8}$/; // Bangladesh mobile format

class FormHelper {
  // Check if a value is empty or null
  static isEmpty(value) {
    return typeof value !== "string" || value.trim().length === 0;
  }

  // Validate Bangladeshi mobile number
  static isMobile(value) {
    if (this.isEmpty(value)) return false;
    return MobileRegx.test(value.trim());
  }

  // Validate image file extension
  static isImageValid(fileName = "") {
    if (this.isEmpty(fileName)) return false;
    const extension = fileName.split(".").pop().toLowerCase();
    return validFileExtensions.includes(extension);
  }

  // Validate if only numeric input
  static isNumber(value) {
    if (this.isEmpty(value)) return false;
    return OnlyNumberRegx.test(value.trim());
  }

  // Validate email format
  static isEmail(value) {
    if (this.isEmpty(value)) return false;
    return EmailRegx.test(value.trim());
  }

  // Toast for error
  static errorToast(msg) {
    if (!msg) return;
    cogoToast.error(msg, { position: "bottom-center" });
  }

  // Toast for success
  static successToast(msg) {
    if (!msg) return;
    cogoToast.success(msg, { position: "bottom-center" });
  }
}

export default FormHelper;
