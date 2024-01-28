const express = require("express");
const File = require("../models/File");
const router = express.Router();
router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.json({ message: "link has been expired" });
    }
    return res.json({
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
      path: file.path,
      // http://localhost:3000/files/download/2728772hdd28uj
    });
  } catch (err) {
    return res.json({ message: "something went wrong" });
  }
});
module.exports = router;
