const OTPModel = require("../models/OTPModel");
const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const SendEmailUtility = require("../utilities/SendEmailUtility");

/* -------------------------------------------------------------------- */
/*                       User Registration Controller                   */
/* -------------------------------------------------------------------- */

exports.registration = async (req, res) => {
  const reqBody = req.body;
  UsersModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: "fail", message: err.message });
    } else {
      res
        .status(200)
        .json({ status: "success", message: "User Registered", data: data });
    }
  });
};

/* -------------------------------------------------------------------- */
/*                       User Login Controller                   */
/* -------------------------------------------------------------------- */

exports.login = async (req, res) => {
  const reqBody = req.body;
  UsersModel.aggregate(
    [
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          phone: 1,
          photo: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", message: err.message });
      } else {
        if (data.length > 0) {
          const Payload = {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            data: data[0]["email"],
          };
          const token = jwt.sign(Payload, "thesecretkey");
          res.status(200).json({
            status: "success",
            message: "User Logged In",
            token: token,
            data: data[0],
          });
        } else {
          res
            .status(401)
            .json({ status: "fail", message: "unauthorized user" });
        }
      }
    }
  );
};

/* -------------------------------------------------------------------- */
/*                       profile update Controller                   */
/* -------------------------------------------------------------------- */

exports.profileUpdate = async (req, res) => {
  const email = req.headers["email"];
  const reqBody = req.body;
  UsersModel.updateOne({ email: email }, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
    } else {
      res
        .status(200)
        .json({ status: "success", message: "Profile Updated", data: data });
    }
  });
};

/* -------------------------------------------------------------------- */
/*                       Get profile Controller                         */
/* -------------------------------------------------------------------- */
exports.getProfile = async (req, res) => {
  const email = req.headers["email"];
  UsersModel.aggregate(
    [
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
          password: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", message: err.message });
      } else {
        if (data.length > 0) {
          res.status(200).json({ status: "success", data: data[0] });
        } else {
          res
            .status(404)
            .json({ status: "fail", message: "Profile not found" });
        }
      }
    }
  );
};

/* -------------------------------------------------------------------- */
/*                       Recover by Mail Controller                     */
/* -------------------------------------------------------------------- */
exports.RecoverVerifyEmail = async (req, res) => {
  // Query if email exist ?
  const email = req.params.email;
  const OTP = Math.floor(100000 + Math.random() * 900000);
  // Insert OTP code into DB
  try {
    const UserCount = await UsersModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (UserCount !== 0) {
      await OTPModel.create({ email: email, otp: OTP });
      // Send email using nodemailer
      const SendEmail = await SendEmailUtility(
        email,
        `Your PIN is ${OTP}. Use this OTP to verify yourself and reset your password. `,
        "Task Manager PIN Verification"
      );
      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({
        status: "fail",
        message: "User does not exist",
        UserCount,
      });
    }
  } catch (err) {
    res.status(200).json({ status: "fail", message: err.toSting() });
  }
};

/* -------------------------------------------------------------------- */
/*                       Recover Verify OTP Controller                     */
/* -------------------------------------------------------------------- */
exports.RecoverVerifyOTP = async (req, res) => {
  // Query if email exist ?
  const email = req.params.email;
  const OTPCode = req.params.otp;
  const status = 0;
  const statusUpdate = 1;

  try {
    const OTPCount = await UsersModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);
    if (OTPCode !== 0) {
      const OTPUpdate = await OTPModel.updateOne(
        {
          email: email,
          otp: OTPCode,
          status: status,
        },
        {
          status: statusUpdate,
        }
      );
      res
        .status(200)
        .json({ status: "success", OTPUpdate: OTPUpdate, OTPCount: OTPCount });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP" });
    }
  } catch (err) {
    res.status(200).json({ status: "fail", message: err.toSting() });
  }
};

/* -------------------------------------------------------------------- */
/*                       Recover Reset Password Controller                     */
/* -------------------------------------------------------------------- */
exports.RecoverResetPass = async (req, res) => {
  // Query if email exist ?
  const email = req.body.email;
  const OTPCode = req.body.otp;
  const NewPass = req.body.password;
  const statusUpdate = 1;

  try {
    const OTPUsedCount = await OTPModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);
    if (OTPUsedCount !== 0) {
      const PasswordUpdate = await UsersModel.updateOne(
        {
          email: email,
        },
        {
          password: NewPass,
        }
      );
      res.status(200).json({ status: "success", NewPassword: PasswordUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP" });
    }
  } catch (err) {
    res.status(200).json({ status: "fail", message: err.toSting() });
  }
};
