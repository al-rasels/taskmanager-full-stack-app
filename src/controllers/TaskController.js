const TaskModel = require("../models/TaskModel");

/* -------------------------------------------------------------------- */
/*                       Create Task Controller                   */
/* -------------------------------------------------------------------- */

exports.createTask = async (req, res) => {
  const email = req.headers["email"];
  const reqBody = req.body;
  reqBody["email"] = email;
  TaskModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
    } else {
      res
        .status(200)
        .json({ status: "success", message: "Task Created", data: data });
    }
  });
};

/* -------------------------------------------------------------------- */
/*                       Delete Tasks Controller                        */
/* -------------------------------------------------------------------- */

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  TaskModel.remove({ _id: id }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
    } else {
      res
        .status(200)
        .json({ status: "success", message: "Task Deleted", data: data });
    }
  });
};
/* -------------------------------------------------------------------- */
/*                       Update Tasks Status Controller                 */
/* -------------------------------------------------------------------- */

exports.updateTaskStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  TaskModel.updateOne({ _id: id }, { status: status }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
    } else {
      res
        .status(200)
        .json({
          status: "success",
          message: "Task Status Updated",
          data: data,
        });
    }
  });
};
