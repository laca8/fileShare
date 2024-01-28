const mongoose = require("mongoose");
const fileSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
    },
    reciever: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("file", fileSchema);
