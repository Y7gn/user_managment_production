import User from "../models/User.js";
import Customer from "../models/Customer.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import CheckPremissions from "../utils/CheckPremissions.js";
import mongoose from "mongoose";
import moment from "moment";
// customername,phonenumber,companypercentage,excesscashcustomer,customerstatus,supportedornot,salarybank,financebank,obligations,buildingPlace,CompanyPercentage
const createCustomer = async (req, res) => {
  const {
    customername,
    customerstatus,
    phonenumber,
    companypercentage,
    excesscashcustomer,
    supportedornot,
    salarybank,
    financebank,
    obligations,
    buildingPlace,
  } = req.body;

  if (!customername) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.CREATED).json({ customer });
};
const getAllCustomers = async (req, res) => {
  const { customerstatus, searchname, phoneNumber, sort } = req.query;
  console.log(req.query);
  const queryObject = {
    // createdBy:req.user.userId
  };
  // const jobs = await Job.find({createdBy:req.user.userId})

  //add stuff based on condition
  if (customerstatus && customerstatus !== "الجميع") {
    //add it to query object
    queryObject.customerstatus = customerstatus;
  }
  // if (jobType !== 'all') {
  //     queryObject.jobType = jobType;
  // }
  if (searchname) {
    queryObject.customername = { $regex: searchname, $options: "i" };
  }
  if (phoneNumber) {
    queryObject.phonenumber = { $regex: phoneNumber, $options: "i" };
  }
  //NO AWAIT for sorting
  console.log(queryObject);
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

  // setup pagination
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.page) || 10;
  // const skip = (page - 1) * limit;
  // result = result.skip(skip).limit(limit);
  //75
  //10 10 10 10 10 10 5
  const customers = await result;

  // const totalCustomers = await Customer.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalCustomers / limit);

  res
    .status(StatusCodes.OK)
    .json({ customers, totalCustomers: customers.length });
  // , numOfPages
  // res.send('get all jobs')
};
const updateCustomer = async (req, res) => {
  const { id: CustomerId } = req.params;
  const {
    customername,
    customerstatus,
    phonenumber,
    companypercentage,
    excesscashcustomer,
    supportedornot,
    salarybank,
    financebank,
    obligations,
    buildingPlace,
  } = req.body;
  req.body.createdBy = req.user.userId;
  // if (!customername || !customerstatus) {
  //   throw new BadRequestError("Please provide all Values.");
  // }

  const customer = await Customer.findOne({ _id: CustomerId });
  if (!customer) {
    throw new NotFoundError(`No Customer with id ${CustomerId}.`);
  }

  // check premission
  // CheckPremissions(req.user,customer.createdBy)
  const updateCustomer = await Customer.findOneAndUpdate(
    { _id: CustomerId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updateCustomer });
  // res.send('update job')
};
const deleteCustomer = async (req, res) => {
  const { id: CustomerId } = req.params;

  const customer = await Customer.findOne({ _id: CustomerId });
  if (!customer) {
    throw new NotFoundError(`No job with id ${CustomerId}.`);
  }
  CheckPremissions(req.user, customer.createdBy);
  await customer.remove();
  res.status(StatusCodes.OK).json({ msg: `Success! Customer removed` });
  //message won't show on front end
  // res.send('delete job')
};
const showStatsCustomer = async (req, res) => {
  let stats = await Customer.aggregate([
    // { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$customerstatus", count: { $sum: 1 } } },
  ]);
  console.log("stats");
  console.log(stats);
  //not return status as array , instead return as object, and each status property value equal to count
  // status as object easier in front-end

  stats.forEach((element) => {
    if (element._id == "عميل تم الانجاز") {
      element._id = "done";
    }
    if (element._id == "الحسبة قيد الانتظار") {
      element._id = "waiting";
    }
    if (element._id == "عميل متردد") {
      element._id = "unsure";
    }
  });
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;

    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);
  const defaultStats = {
    done: stats.done || 0,
    waiting: stats.waiting || 0,
    unsure: stats.unsure || 0,
  };

  let monthlyApplications = await Customer.aggregate([
    // { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } }, // get all jobs belong to user
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, //get latest value
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y"); // 1-12
      return { date, count };
    })
    .reverse(); //from oldest to newest
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
export {
  createCustomer,
  getAllCustomers,
  showStatsCustomer,
  deleteCustomer,
  updateCustomer,
};
