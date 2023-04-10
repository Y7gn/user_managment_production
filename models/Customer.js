
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    CustomerName: {
      type: String,
      required: [true, 'Please provide customer name'],
      maxlength: 50,
    },
    CustomerStatus: {
        type: String,
        enum: ['done', 'waiting', 'refused','unsure'],
        default: 'waiting customer',
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
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Customer', CustomerSchema);