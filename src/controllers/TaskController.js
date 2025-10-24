const TaskModel = require("../models/TaskModel");

/* -------------------------------------------------------------------- */
/*                       Create Task Controller                   */
/* -------------------------------------------------------------------- */

exports.createTask = (req, res) => {
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

exports.deleteTask = (req, res) => {
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

exports.updateTaskStatus = (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  TaskModel.updateOne({ _id: id }, { status: status }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", message: err.message });
    } else {
      res.status(200).json({
        status: "success",
        message: "Task Status Updated",
        data: data,
      });
    }
  });
};

/*-------------------------------------------------------------------------- */
/*                          Get Task by Status Task Controller               */
/* -------------------------------------------------------------------------- */
exports.getTasksByStatus = (req, res) => {
  const email = req.headers["email"];
  const status = req.params.status;
  TaskModel.aggregate(
    [
      { $match: { email: email, status: status } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdDate" },
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", message: err.message });
      } else {
        res
          .status(200)
          .json({ status: "success", message: "Tasks Retrieved", data: data });
      }
    }
  );
};

/* -------------------------------------------------------------------- */
/*                        Task Status By Count Controller               */
/* -------------------------------------------------------------------- */

exports.getTaskStatusCount = (req, res) => {
  const email = req.headers["email"];
  TaskModel.aggregate(
    [
      { $match: { email: email } },
      {
        $group: {
          _id: "$status",
          sum: { $count: {} },
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", message: err.message });
      } else {
        res.status(200).json({
          status: "success",
          message: "Task Status Count Retrieved",
          data: data,
        });
      }
    }
  );
};
