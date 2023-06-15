import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    customername: {
      type: String,
      required: [true, "Please provide customer name"],
      maxlength: 50,
    },
    phonenumber: {
      type: String,
      maxlength: 50,
    },
    companypercentage: {
      type: String,
    },
    excesscashcustomer: {
      type: String,
    },
    customerstatus: {
      type: String,
    },
    supportedornot: {
      type: String,
    },
    salarybank: {
      type: String,
    },
    financebank: {
      type: String,
    },
    obligations: {
      car: false,
      creditbank: false,
      developmentbank: false,
      nayifat: false,
      personalloan: false,
      yusrcompany: false,
      other: "",
    },
    buildingPlace: {
      type: String,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
