const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', auth, getAllProducts);
router.post('/', auth, authorizeRoles('vendor', 'admin'), createProduct);
router.put('/:id', auth, authorizeRoles('vendor', 'admin'), updateProduct);
router.delete('/:id', auth, authorizeRoles('admin'), deleteProduct);

module.exports = router;