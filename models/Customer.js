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
      // required: [true, "Please provide customer name"],
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
      // enum: ["done", "waiting", "refused", "unsure"],
      // default: "waiting customer",
    },
    supportedornot: {
      type: String,
      // enum: ["مدعوم", "غير مدعوم"],
    },
    salarybank: {
      type: String,
      // enum: ["الراجحي", "الاهلي", "الفرنسي"],
    },
    financebank: {
      type: String,
      // enum: ["one", "two", "three", "four"],
    },
    obligations: {
      type: String,
      // enum: [
      //   "امكان",
      //   "بنك التسليف",
      //   "بنك التنمية",
      //   "سيارة",
      //   "شركة اليسر",
      //   "نايفات",
      // ],
    },
    buildingPlace: {
      type: String,
      // enum: ["نجران", "القويقعه", "تربه"],
    },
    CompanyPercentage: {
      type: String,
      // enum: ["done", "wgaiting", "refused", "unsure"],
      // default: "waiting customer",
    },

    // position: {
    //   type: String,
    //   required: [true, 'Please provide position'],
    //   maxlength: 100,
    // },
    // jobType: {
    //   type: String,
    //   enum: ['full-time', 'part-time', 'remote', 'internship'],
    //   default: 'full-time',
    // },
    // jobLocation: {
    //   type: String,
    //   default: 'my city',
    //   required: true,
    // },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
