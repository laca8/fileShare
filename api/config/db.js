const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/fileShare`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected...");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
