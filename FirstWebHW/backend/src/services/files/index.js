const express = require("express");
const multer = require("multer");
const { writeFile, createReadStream } = require("fs-extra");
const { join } = require("path");

const router = express.Router();
const upload = multer({});
// This is the folder path that we  upload files
const studentsFolderPath = join(__dirname, "../../../public/");

router.post("/upload", upload.single("avatar"), async (req, res, next) => {
  try {
    await writeFile(
      join(studentsFolderPath, req.file.originalname),
      req.file.buffer
    );
    // this is generated url to access file
    res.send(`http://localhost:3002/uploads/` + req.file.originalname);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
