/**
 * API Endpoints (Express Router Configuration)
 *
 * Responsibilities:
 * - Load and configure express routes
 * - Handle Request validation and authentication
 * - Delegate business logic to controllers
 * - Mount API routes
 * - Export the configured router
 */

// Importing express library
const express = require("express");

// Importing Middlewares and Controllers
const UsersController = require("../controllers/UsersController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const TaskController = require("../controllers/TaskController");
/* -------------------------------------------------------------------------- */
//  Creating Router instance
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Users Routes                                  */
/* -------------------------------------------------------------------------- */

// 1. User Registration Route
router.post("/registration", UsersController.registration);

// 2. User Login Route
router.post("/login", UsersController.login);

// 3. Update User Profile Route
router.post(
  "/profileUpdate",
  AuthVerifyMiddleware,
  UsersController.profileUpdate
);

// 4. Get User Details Route
router.get("/ProfileDetails", AuthVerifyMiddleware, UsersController.getProfile);

// 5. Password Recovery Routes
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
// 6. Verify OTP Route
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
// 7. Reset Password Route
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

/* -------------------------------------------------------------------------- */
/*                              Tasks Routes                                  */
/* -------------------------------------------------------------------------- */
// 1. Create Task Route
router.post("/createTask", AuthVerifyMiddleware, TaskController.createTask);
// 2. Delete Task Route
router.get("/deleteTask/:id", AuthVerifyMiddleware, TaskController.deleteTask);
// 3. Update Task Status Route
router.get(
  "/updateTaskStatus/:id/:status",
  AuthVerifyMiddleware,
  TaskController.updateTaskStatus
);
// 4. Get Tasks by Status Route
router.get(
  "/getTasksByStatus/:status",
  AuthVerifyMiddleware,
  TaskController.getTasksByStatus
);
// Count Tasks by Status Route
router.get(
  "/countTasksByStatus",
  AuthVerifyMiddleware,
  TaskController.getTaskStatusCount
);

// Exporting the configured router
module.exports = router;
