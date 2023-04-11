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
    excesscashcustomersupportedornot,
    salarybank,
    financebank,
    obligations,
    buildingPlace,
    CompanyPercentage,
  } = req.body;

  if (!customername) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.CREATED).json({ customer });
};
const getAllCustomers = async (req, res) => {
  const { status, search } = req.query;

  const queryObject = {
    // createdBy:req.user.userId
  };
  // const jobs = await Job.find({createdBy:req.user.userId})

  //add stuff based on condition
  if (status && status !== "all") {
    //add it to query object
    queryObject.status = status;
  }
  // if (jobType !== 'all') {
  //     queryObject.jobType = jobType;
  // }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  //NO AWAIT for sorting
  let result = Customer.find(queryObject);
  // if(sort === 'latest'){
  //     result = result.sort('-createdAt')
  // }
  // if(sort === 'oldest'){
  //     result = result.sort('createdAt')
  // }
  // if(sort === 'a-z'){
  //     result = result.sort('position')
  // }
  // if(sort === 'z-a'){
  //     result = result.sort('-position')
  // }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.page) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //75
  //10 10 10 10 10 10 5
  const customers = await result;

  const totalCustomers = await Customer.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCustomers / limit);

  res
    .status(StatusCodes.OK)
    .json({ customers, totalCustomers: customers.length, numOfPages });
  // res.send('get all jobs')
};
const updateCustomer = async (req, res) => {
  const { id: CustomerId } = req.params;

  const { customername, customerstatus } = req.body;
  req.body.createdBy = req.user.userId;
  if (!customername || !customerstatus) {
    throw new BadRequestError("Please provide all Values.");
  }

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
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$CustomerStatus", count: { $sum: 1 } } },
  ]);
  //not return status as array , instead return as object, and each status property value equal to count
  // status as object easier in front-end

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    done: stats.done || 0,
    waiting: stats.waiting || 0,
    unsure: stats.unsure || 0,
  };

  let monthlyApplications = await Customer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } }, // get all jobs belong to user
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
