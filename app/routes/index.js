const express = require('express');
const router = express.Router();
const latexRoutes = require('./latexRoutes');
const examRoutes = require('./examRoutes');
const userRoutes = require('./userRoutes');

router.use('/latex', latexRoutes);
router.use('/exam', examRoutes);
router.use('/user', userRoutes);

module.exports = router;
