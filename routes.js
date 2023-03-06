const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

router.get("/one", productController.hello);

router.post("", productController.createProduct);

module.exports = router;
