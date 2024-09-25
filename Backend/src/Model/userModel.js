import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    otp: {
      value: { type: String },
      expire: { type: Date },
    },
    enrollments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
