var express = require('express');
var router = express.Router();
const authentication = require('../middleware/outh')
const controller = require('../controller');
const authorization = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');

// POST /users/register
router.post('/users/register', controller.register);
// POST /users/login
router.post('/users/login', controller.login);
router.use(authentication)
// PATCH /users/:id
router.patch('/users/:id', controller.update);
// DELETE /users/:id
router.delete('/users/:id', controller.delete);
// GET /users
router.get('/users', controller.getUser);
// GET /users/vehicle
router.get('/users/vehicle', controller.getVehicle);
// GET /users/:id
router.get('/users/:id', controller.getUserId);
// POST /users/vehicle
router.post('/users/vehicle-create',authorization, controller.createVehicle);
router.use(errorHandler)




module.exports = router;


// GET /users => retrieved all users
//   GET /users/:id => retrieved user with spesific ID
//   POST /users => create or save data to DB
//   PATCH /users/:id => update data to DB
//   DELETE /users/:id => delete data to DB