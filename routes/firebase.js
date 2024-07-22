const express = require('express');
const fbController = require('./../controllers/fbController');

const router = express.Router();

router
    .route('/retrieve')
    .get(fbController.getDoc);

router
    .route('/update')
    .post(fbController.updateDoc);

router
    .route('/reset')
    .post(fbController.resetDoc);   


module.exports = router;