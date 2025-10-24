const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------- */
/*                       User Registration Controller                   */
/* -------------------------------------------------------------------- */

exports.registration = async (req, res) => {
  const reqBody = req.body;
  UsersModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
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
      res
        .status(200)
        .json({ status: "success", message: "User Logged In", data: data });
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
