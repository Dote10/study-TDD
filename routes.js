const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

router.get("/one", productController.hello);

module.exports = router;
