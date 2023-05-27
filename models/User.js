import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "الرجاء اختيار اسم"],
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    minlength: 3,
    required: [true, "الرجاء اختيار اسم"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    // minlength:6,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  permissions: {
    addCustomer: false,
    editAndDeleteCustomer: false,
    showAllCustomers: false,
    addEmployee: false,
    editAndDeleteEmployee: false,
    showAllEmployee: false,
  },

  // email: {
  //     type: String,
  //     required: [true,'please provide email'],
  //     unique:true,
  //     validate:{
  //         validator: validator.isEmail,
  //         message:'please provide a valid email'
  //     }
  // },
  // lastName: {
  //     type: String,
  //     trim:true,
  //     maxlength:20,
  //     default: 'lastname',
  // },
  // location: {
  //     type: String,
  //     trim:true,
  //     maxlength:20,
  //     default: 'my city',
  // },
});

UserSchema.pre("save", async function () {
  if (this.isModified("password") === true) {
    // if we are not modifiying the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);

// addCustomer:{
//     type: Boolean,
//     default:false,
// },
// editAndDeleteCustomer:{
//     type: Boolean,
//     default:false,

// },
// showAllCustomers:{
//     type: Boolean,
//     default:false,

// },
// addEmployee:{
//     type: Boolean,
//     default:false,
// },
// editAndDeleteEmployee:{
//     type: Boolean,
//     default:false,
// },
// showAllEmployee:{
//     type: Boolean,
//     default:false,
// },
