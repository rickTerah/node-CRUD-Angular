
const express = require('express');
const ThingController = require('../controllers/thing.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.get('/', ThingController.getAllThings);
router.get('/:id', ThingController.getSingleThing);
router.post('/', auth, multer, ThingController.addOneThing);
router.put('/:id', auth, ThingController.updateSingleThing);
router.delete('/:id', auth, ThingController.deleteSingleThing);

module.exports = router;