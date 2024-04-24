const express = require("express");
const router = new express.Router();
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
const productController = require("../../controllers/product/productController");
//product routes

router.post("/addcategory", adminauthenticate, productController.AddCategory);
router.get("/getcategory", productController.GetCategory);

module.exports = router;
