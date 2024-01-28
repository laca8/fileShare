const express = require("express");
const File = require("../models/File");
const path = require("path");
const router = express.Router();
router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.json({ message: "link has been expired" });
    }
    console.log(file);
    const filePath = `${file.path}`;
    res.json(`C:\Users/AHMED/Desktop/react/file-sharing-app/api/${filePath}`);
    console.log(
      `C:\Users/AHMED/Desktop/react/file-sharing-app/api/${filePath}`
    );
    // res.send("download success");
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
});

module.exports = router;
