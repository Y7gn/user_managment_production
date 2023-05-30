import express from "express";
const router = express.Router();
import rateLimiter from "express-rate-limit";

import {
  CreateUser,
  login,
  updateUser,
  getCurrentUser,
  logoutUser,
  allUsers,
  updateUserInformation,
  getSingleUserCustomers,
  CreateEmployee,
  deleteEmployee,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

// const apiLimiter = rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 10,
//     message: 'Too many requests from this IP, please try again after 15 minutes',
//   });

// apiLimiter
router.route("/CreateUser").post(CreateUser);
router.route("/CreateEmployee").post(CreateEmployee);

// apiLimiter
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/:id").patch(authenticateUser, updateUserInformation);
router.route("/allUsers").get(authenticateUser, allUsers);
router
  .route("/getSingleUserCustomers")
  .get(authenticateUser, getSingleUserCustomers);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/:id").delete(authenticateUser, deleteEmployee);
router.get("/logout", logoutUser);

export default router;
