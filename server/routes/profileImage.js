const express = require("express");
const router = express.Router();

const multer  = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
      cb(null, './uploads')
    }, filename : function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname + '-' + uniqueSuffix);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  
const upload = multer({storage: storage, fileFilter: fileFilter});

const { imageUploadHandler } = require("../controllers/imageUploads.js");

router.post("/profile-image", upload.single('profile-image'), imageUploadHandler);

module.exports = router;
