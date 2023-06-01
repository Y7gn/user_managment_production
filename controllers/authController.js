import User from "../models/User.js";
import Customer from "../models/Customer.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";
import bcrypt from "bcryptjs";

const CreateUser = async (req, res) => {
  const { username, password, name, permissions } = req.body;

  if (!username || !password || !name) {
    throw new BadRequestError("please provide all the values");
    //everytime we use CustomAPIError we will send badrequest error
  }
  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    throw new BadRequestError("Username already in use");
  }

  const user = await User.create({
    username,
    name,
    password,
    permissions: {
      addCustomer: req.body.addCustomerCheckBox,
      editAndDeleteCustomer: req.body.editDeleteEmployeeCheckBox,
      showAllCustomers: req.body.allCustomersCheckBox,
      addEmployee: req.body.addEmployeeCheckBox,
      editAndDeleteEmployee: req.body.editDeleteEmployeeCheckBox,
      showAllEmployee: req.body.allEmployeeCheckBox,
    },
  });
  console.log(user);
  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
    },
  }); //remove token
};
const CreateEmployee = async (req, res) => {
  const { username, password, name, permissions } = req.body;

  if (!username || !password || !name) {
    throw new BadRequestError("please provide all the values");
  }
  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    throw new BadRequestError("Username already in use");
  }

  await User.create({
    username,
    name,
    password,
    permissions: {
      addCustomer: req.body.addCustomerCheckBox,
      editAndDeleteCustomer: req.body.editDeleteEmployeeCheckBox,
      showAllCustomers: req.body.allCustomersCheckBox,
      addEmployee: req.body.addEmployeeCheckBox,
      editAndDeleteEmployee: req.body.editDeleteEmployeeCheckBox,
      showAllEmployee: req.body.allEmployeeCheckBox,
    },
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Create Employee",
  }); //remove token
};
// without async-wrapper
// const register = async (req,res, next) => {
//     try {
//         const user = User.create(req.body)
//         res.status(201).json({user})
//     } catch (error) {
//         // res.status(500).json({msg:'there was an error'})
//         next(error)
//     }
// }
const login = async (req, res) => {
  const { username, password } = req.body;
  if ((!username, !password)) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials , no user!");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials , no match password!");
  }
  //then setting up token sending back response
  const token = user.createJWT();
  user.password = undefined;
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user });
};
const updateUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new BadRequestError("please provide all the values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.username = username;

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user });
};
const allUsers = async (req, res) => {
  let result = await User.find({ isAdmin: false });
  console.log(req.user);

  // console.log("fdlsfldslfslfldsflflslf");
  let myUserId = req.user.userId;
  let employees = result.filter((user) => user["_id"] != myUserId);
  // users = users[0]["_id"];
  res.status(StatusCodes.OK).json({ employees });
};
const getCurrentUser = async (req, res) => {
  // if(req.user.isAdmin){}
  const user = await User.findOne({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ user });
};
const getSingleUserCustomers = async (req, res) => {
  const { customerstatus, searchname, phoneNumber, sort } = req.query;

  // const mycustomers = await Customer.find({ createdBy: req.user.userId });
  let queryObject = {
    createdBy: req.user.userId,
  };
  console.log(req.query);

  if (searchname) {
    queryObject.customername = { $regex: searchname, $options: "i" };
  }
  if (phoneNumber) {
    queryObject.phonenumber = { $regex: phoneNumber, $options: "i" };
  }
  if (customerstatus && customerstatus !== "الجميع") {
    //add it to query object
    queryObject.customerstatus = customerstatus;
  }
  let result = Customer.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "أ-ي") {
    result = result
      .collation({ locale: "ar", strength: 2 })
      .sort("customername");
  }
  if (sort === "ي-أ") {
    result = result
      .collation({ locale: "ar", strength: 2 })
      .sort("-customername");
  }
  const mycustomers = await result;

  res.status(StatusCodes.OK).json({ mycustomers });
};
const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const updateUserInformation = async (req, res) => {
  const { id: editEmployeeId } = req.params;
  const { username, password, name, permissions } = req.body;
  console.log(req.body);

  if (!username || !name) {
    throw new BadRequestError("Please provide all Values.");
  }

  const user = await User.findOne({ _id: editEmployeeId });
  if (!user) {
    throw new NotFoundError(`No job with id ${editEmployeeId}.`);
  }
  const salt = await bcrypt.genSalt(10);
  let encPass = await bcrypt.hash(password, salt);
  // check premission
  // CheckPremissions(req.user, user.createdBy);
  const updateJob = await User.findOneAndUpdate(
    { _id: editEmployeeId },
    {
      username,
      name,
      encPass,
      permissions: {
        addCustomer: req.body.addCustomerCheckBox,
        editAndDeleteCustomer: req.body.editDeleteEmployeeCheckBox,
        showAllCustomers: req.body.allCustomersCheckBox,
        addEmployee: req.body.addEmployeeCheckBox,
        editAndDeleteEmployee: req.body.editDeleteEmployeeCheckBox,
        showAllEmployee: req.body.allEmployeeCheckBox,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log("updateJob");
  console.log(updateJob);
  res.status(StatusCodes.OK).json({ updateJob });
  // res.send('update job')
};

const deleteEmployee = async (req, res) => {
  const { id: EmployeeId } = req.params;

  const employee = await User.findOne({ _id: EmployeeId });
  if (!employee) {
    throw new NotFoundError(`No Employee with id ${EmployeeId}.`);
  }
  // CheckPremissions(req.user, customer.createdBy);
  await employee.remove();
  res.status(StatusCodes.OK).json({ msg: `Success! Employee removed` });
};
export {
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
};
