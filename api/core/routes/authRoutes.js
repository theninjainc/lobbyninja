const express = require('express');
const {
    loginHandler,
    registerHandler,
    getAccountHandler,
} = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.get('/account', getAccountHandler);

module.exports = router;
