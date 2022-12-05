const express = require('express');

const router = express.Router();

const controller = require('../Controller/eKartController');

router.get('/setupdb',controller.setupdb)
router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.post('/:username/update',controller.updatePassword);
router.get('/products',controller.getProducts);
router.get('/searchProduct/:productName',controller.getProductBySearch);
router.get('/:productName/details',controller.getProductDetails);
router.get('/deals',controller.getDeals);
// router.post('/:username/addtocart',controller.addProductToCart);
// router.post('/:username/modifycart',controller.modifyProductInCart);
// router.get('/:username/cart',controller.viewProductsInart);
// router.post('/:username/orders',controller.makeOrder);

module.exports = router;
