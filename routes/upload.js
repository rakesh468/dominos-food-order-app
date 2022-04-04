const router = require("express").Router();
const cloundinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

//upload image througn cloundinary//
cloundinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload image only admin//
router.post("/upload", auth, authAdmin, (request, response) => {
  try {
    console.log(request.files);
    if (!request.files || Object.keys(request.files).length === 0)
      return response.status(400).send("No files were uploaded");

    const file = request.files.file;
    if (file.size > 1024 * 1024) {
      removetmp(file.tempFilePath);
      return response.status(400).json({ msg: "Size is too large" });
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removetmp(file.tempFilePath);
      return response.status(400).json({ msg: "file format is incorrect" });
    }

    cloundinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "food" },
      async (err, result) => {
        if (err) throw err;
        removetmp(file.tempFilePath);
        response.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return response.status(400).json({ msg: error.message });
  }
});

//delete image//

router.post("/destory", auth, authAdmin, (request, response) => {
  try {
    const { public_id } = request.body;
    if (!public_id)
      return response.status(400).json({ msg: "No images Selected" });

    cloundinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      response.json({ msg: "Deleted Image" });
    });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
});

const removetmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
