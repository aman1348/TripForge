const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({

  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  salt : Buffer,
  otp: { type: String, default: undefined },
  otpExpiry: {type: Date}
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);
