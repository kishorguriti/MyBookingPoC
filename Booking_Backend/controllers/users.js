const userModel = require("../models/users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { promisify } = require("util");
const UserModel = require("../models/users");
const { BookedHotels } = require("./hotel");
const HotelModel = require("../models/hotel");
const RoomsModel = require("../models/room");

const saltRounds = 10;
let bodywithHashedPasw;

// register a new user

const createUser = async (req, res, next) => {
  let body = req.body;

  let validatingUsername = await userModel.find({ username: body.username });

  if (validatingUsername.length !== 0) {
    next({ message: "Username Already Exist" });
    return;
  }

  let validatingEmail = await userModel.find({ email: body.email });

  if (validatingEmail.length !== 0) {
    next({ message: "Email Already Exist" });
    return;
  }

  try {
    let userPassword = body.password;

    // bcrypt.genSalt(saltRounds, async function (err, salt) { --- await is needed so modified as below
    //   bcrypt.hash(userPassword, salt, function (err, hash) {
    //     body.password = hash;
    //     bodywithHashedPasw = body;
    //   });
    // });

    const genSaltAsync = promisify(bcrypt.genSalt);
    const hashAsync = promisify(bcrypt.hash);

    const salt = await genSaltAsync(saltRounds);
    const hash = await hashAsync(userPassword, salt);
    body.password = hash;
    bodywithHashedPasw = body;

    let newUser = new userModel(bodywithHashedPasw);

    let saveUser = await newUser.save();

    return res.status(200).send(saveUser);
  } catch (err) {
    next(err);
  }
};

//update a user

const updateUser = async function (req, res, next) {
  let body = req.body;
  let userBookingdetails = req.body.userBookingdetails;
  let hotelId = req.body.BookedHotelid;
  let userid = req.params.id;
  let userFavHotel = req.body.hotelID;
  console.log(body, "55");

  try {
    let updateUser = await userModel.findByIdAndUpdate(
      userid,
      {
        $addToSet: {
          BookedHotels: hotelId,
          BookingDetails: userBookingdetails,
          userFavHotels: [],
        },
      },
      { new: true }
    );
    return res.status(200).send(updateUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// get all users

const allUsers = async function (req, res, next) {
  try {
    let all = await userModel.find({});

    return res.status(200).send(all);
  } catch (err) {
    next(err);
  }
};

// get a single user

const singleUser = async function (req, res, next) {
  let id = req.params.id;

  try {
    let singlUserr = await userModel.findById(id);

    return res.status(200).send(singlUserr);
  } catch (err) {
    next(err);
  }
};

//  delete a specific user

const deleteUser = async function (req, res, next) {
  let id = req.params.id;

  try {
    let deletedUser = await userModel.findByIdAndDelete(id);

    return res.status(200).send(deletedUser);
  } catch (err) {
    next(err);
  }
};

// login verification

// const UserLogin = async function (req, res, next) {
//   let body = req.body;

//   try {
//     let user = await userModel.find({
//       username: body.username,
//     });

//     console.log(user, "logged user");
//     if (!user) {
//       let error = {
//         status: 401,
//         message: "User Not Exist",
//       };
//       next(error);

//       return res.status(401).send("user not found");
//     }

//     const isPassword = await bcrypt.compare(body.password, user[0].password);
//     console.log(isPassword);

//     if (!isPassword) {
//       return res.send({ err: "incorrect password" });
//     }

//     const token = jwt.sign(
//       { id: user[0]._id, isAdmin: user[0].isAdmin },
//       "kishor"
//     );

//     console.log(token, "this is token");

//     const { password, isAdmin, ...otherdetails } = user[0]._doc;

//     return res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .send({ ...otherdetails });
//   } catch (err) {
//     return res.send({ err: "this is error catch" });
//   }
// };

const UserLogin = async function (req, res, next) {
  let body = req.body;
  try {
    let user = await UserModel.find({ username: body.username });

    if (user.length === 0) {
      next({ status: 401, message: "user not found" });
      return;
    }
    const isPasswordVerified = await bcrypt.compare(
      body.password,
      user[0].password
    );

    if (!isPasswordVerified) {
      next({ status: 401, message: "Invalid Password" });
      return;
    }

    return res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

// authentication

const authenticate = async function (req, res, next) {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token, "this is token");

  if (!token) {
    return res.status(404).send("you are not authenticated");
  }

  jwt.verify(token, "kishor", (err, user) => {
    if (err) {
      return res.status(404).send("invalid Token");
    }

    if (user.isAdmin) {
      return next(); // if there is no next middleware then it throws an error , if there is any middle ware it call the next middle ware
    }
    if (!user.isAdmin) {
      return res.send("you are not an admin");
    }
  });
};

const updatefavHotelId = async (req, res, next) => {
  let body = req.body;
  let userId = req.params.userid;
  let favHotel = req.body.hotelid;
  // favHotel = favHotel.toString();
  try {
    let user = await userModel.findById(userId);

    if (!user) {
      next("no user exist");
      return;
    }

    if (!user.userFavHotels.includes(favHotel)) {
      console.log("push");
      let updatedUser = await userModel.findByIdAndUpdate(userId, {
        $addToSet: {
          userFavHotels: favHotel,
        },

        // $set: { userFavHotels: [] },
      });

      return res.send(updatedUser);
    } else {
      console.log("pull");
      let updatedUserFav = await userModel.findByIdAndUpdate(userId, {
        $pull: { userFavHotels: favHotel },

        // $set: { userFavHotels: [] },
      });
      return res.send(updatedUserFav);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getCompletedBookings = async (req, res, next) => {
  let date = new Date();
  date = date.toLocaleDateString("en-GB");
  console.log(date);
  let userId = req.params.id;
  try {
    let user = await UserModel.findById(userId);
    let userBookedHotelIds = user.BookedHotels;
    let completedBookings = await Promise.all(
      user.BookingDetails.map((each) => {
        console.log(each.unavailableDates);
        let parts =
          each.unavailableDates[each.unavailableDates.length - 1].split("/");
        let BookingEndDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // the reason we are formating this is date should be in MM/DD/YYYY format
        console.log(new Date(BookingEndDate).getTime(), new Date().getTime());

        if (new Date(BookingEndDate).getTime() < new Date().getTime()) {
          return each;
        } else return null;
      })
    );

    completedBookings = completedBookings.filter((booking) => booking !== null);
    return res.send(completedBookings);
  } catch (err) {
    return next();
  }
};

const getUpComingBookings = async (req, res, next) => {
  let date = new Date();
  date = date.toLocaleDateString("en-GB");
  console.log(date);
  let userId = req.params.id;
  try {
    let user = await UserModel.findById(userId);
    let userBookedHotelIds = user.BookedHotels;
    let UpComingBookings = await Promise.all(
      user.BookingDetails.map((each) => {
        console.log(each.unavailableDates);
        let parts =
          each.unavailableDates[each.unavailableDates.length - 1].split("/");
        let BookingEndDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // the reason we are formating this is date should be in MM/DD/YYYY format
        console.log(new Date(BookingEndDate).getTime(), new Date().getTime());

        if (new Date(BookingEndDate).getTime() > new Date().getTime()) {
          return each;
        } else return null;
      })
    );

  UpComingBookings = UpComingBookings.filter(
      (booking) => booking !== null
    );
    return res.send(UpComingBookings);
  } catch (err) {
    return next();
  }
};

module.exports = {
  createUser,
  updateUser,
  allUsers,
  singleUser,
  deleteUser,
  UserLogin,
  authenticate,
  updatefavHotelId,
  getCompletedBookings,
  getUpComingBookings,
};
