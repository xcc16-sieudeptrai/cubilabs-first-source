const express = require('express');
const router = express.Router();

const LinkController = require('../controllers/Link.controller');

router.get('/links', LinkController.getAllLinks);
router.get('/:ending', LinkController.redirectLink);

router.use(LinkController.notFound);
module.exports = router;