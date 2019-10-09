
const express = require('express');
const AuthenticationController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/', AuthenticationController.authenticateUser);

module.exports =  router;