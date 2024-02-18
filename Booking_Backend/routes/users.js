var express = require("express");
var router = express.Router();

var userController = require("../controllers/users");
var authController = require("../controllers/auth");

/* GET users listing. */
router.get("/", userController.allUsers);
router.get("/:id", userController.singleUser);

router.post("/register", userController.createUser);
router.post("/login", userController.UserLogin);
router.post("/authentication", authController.authenticate);
router.get("/:id/bookings/completed", userController.getCompletedBookings);
router.get("/:id/bookings/upcoming", userController.getUpComingBookings);

// router.put(
//   "/update/:id",
//   authController.authenticate,
//   userController.updateUser
// );

router.put("/update/:id", userController.updateUser);
router.put("/updatefav/:userid", userController.updatefavHotelId);
router.delete(
  "/delete/:id",
  // authController.authenticate,
  userController.deleteUser
);

module.exports = router;
