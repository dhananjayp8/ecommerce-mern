const express = require("express");
const router = new express.Router();
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
const productController = require("../../controllers/product/productController");
const productupload = require("../../multerConfig/products/productStorageConfig");
//product category

router.post("/addcategory", adminauthenticate, productController.AddCategory);
router.get("/getcategory", productController.GetCategory);

//product routes
router.post(
  "/addProducts",
  [adminauthenticate, productupload.single("productimage")],
  productController.AddProducts
);

module.exports = router;
