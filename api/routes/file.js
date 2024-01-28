const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../services/emailService");
const emailTemplate = require("../services/emailTemplate");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myfile");
const router = express.Router();
router.post("/", async (req, res) => {
  //store file
  upload(req, res, async (err) => {
    //validate req
    if (!req.file) {
      return res.json({ message: "all fields are required" });
    }
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    //store into db
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
    //http:localhost:3000/files/2344jcjdos
  });

  //res => link
});
router.post("/send", async (req, res) => {
  console.log(req.body);
  try {
    const { uuid, emailTo, emailForm } = req.body;
    //validate req
    if (!uuid || !emailTo || !emailForm) {
      return res.json({ message: "all fields required" });
    }
    //get data from db
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      return res.json({ message: "email already sent." });
    }
    (file.sender = emailForm), (file.reciever = emailTo);
    const response = await file.save();
    //send email
    await sendMail({
      from: emailForm,
      to: emailTo,
      subject: "inShare file sharing",
      text: `${emailForm} shared a file with you.`,
      html: emailTemplate({
        emailFrom: emailForm,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: parseInt(file.size / 1000) + "KB",
        expires: "24 hours",
      }),
    });
    return res.json("email sent success!");
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
