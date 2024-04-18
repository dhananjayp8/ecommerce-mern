const express = require("express");
const router = new express.Router();
const adminAuthcontroller = require("../../controllers/admin/adminController");
const adminUpload = require("../../multerConfig/admin/adminStorageConfig");

//admin auth routes
router.post(
  "/register",
  adminUpload.single("admin_profile"),
  adminAuthcontroller.Register
);
router.post("/login", adminAuthcontroller.Login);

module.exports = router;
