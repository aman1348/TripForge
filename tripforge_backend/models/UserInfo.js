const mongoose = require("mongoose");
const { Schema } = mongoose;

const userInfoSchema = Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: { type: String },
  contact: { type: String },
  address: { type: String },
});

const virtual = userInfoSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userInfoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
