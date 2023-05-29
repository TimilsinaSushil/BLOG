const express = require("express");
const router = express.Router();
const multer = require("multer");
const { checkAuth } = require("../middlewares/checkAuth");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/avatars");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFiletr = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(new Error("Only image files", false));
  } else {
    callback(null, true);
  }
};

const uploadSingle = multer({
  storage: storage,
  fileFilter: imageFiletr,
  limits: { fileSize: 0.1 * 1024 * 1024 },
});

const multiStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/photos");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const uploadMultiple = multer({
  storage: multiStorage,
  limits: { fileSize: 0.1 * 1024 * 1024 },
});

router.post(
  "/profile",
  checkAuth,
  uploadSingle.single("avatar"),
  (req, res) => {
    res.send({
      msg: "Avatar uploaded successfully.",
    });
  }
);

router.post(
  "/files",
  checkAuth,
  uploadMultiple.array("files", 12),
  function (req, res) {
    res.send({
      msg: "Files uploaded successfully.",
    });
  }
);

router.get("/download", checkAuth, (req, res) => {
  res.download(`./public/uploads/${req.query.directory}/${req.query.filename}`);
});

module.exports = router;
