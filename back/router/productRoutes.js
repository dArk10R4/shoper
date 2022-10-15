const express = require('express');
var productController = require('../controllers/product');
var Product = require('../schemas/product/productSchema');
var productRouter = new express.Router();
// var savepr = require('../utilities/savepr')


productRouter.get('/api/products',productController.getProductList);
productRouter.get('/api/products/:gender/:search',productController.getProductListBysearch)



module.exports = productRouter;
