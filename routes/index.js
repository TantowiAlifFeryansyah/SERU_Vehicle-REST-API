var express = require('express');
var router = express.Router();
const authentication = require('../middleware/outh')
const controller = require('../controller');
const authorization = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');
const app = express();


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
// GET /users/:id
router.get('/users/:id', controller.getUserId);

// GET /users/vehicle/brand
router.get('/users/vehicle/brand', controller.getVehicleBrand);
// GET /users/vehicle/type
router.get('/users/vehicle/type', controller.getVehicleType);
// GET /users/vehicle/model
router.get('/users/vehicle/model', controller.getVehicleModel);
// GET /users/vehicle/year
router.get('/users/vehicle/year', controller.getVehicleYear);
// GET /users/vehicle/pricelist
router.get('/users/vehicle/pricelist', controller.getVehiclePricelist);

// PATCH /users/vehicle/brand/:id
router.patch('/users/vehicle/updateBrand/:id',authorization, controller.updateVehicleBrand);
// PATCH /users/vehicle/type/:id
router.patch('/users/vehicle/updateType/:id',authorization, controller.updateVehicleType);
// PATCH /users/vehicle/model/:id
router.patch('/users/vehicle/updateModel/:id',authorization, controller.updateVehicleModel);
app.use(express.json());
// PATCH /users/vehicle/year/:id
router.patch('/users/vehicle/updateYear/:id',authorization, controller.updateVehicleYear);

// GET /users/vehicle
router.get('/users/vehicle', controller.getVehicle);
// GET /users/vehicle/:id
router.get('/users/vehicle/:id', controller.getVehicleId);

// POST /users/vehicle
router.post('/users/vehicle-create',authorization, controller.createVehicle);
// PATCH /users/vehicle/:id
router.patch('/users/vehicle/:id',authorization, controller.updateVehicle);
// DELETE /users/vehicle/:id
router.delete('/users/vehicle/:id',authorization, controller.deleteVehicle);
router.use(errorHandler)




module.exports = router;


// GET /users => retrieved all users
//   GET /users/:id => retrieved user with spesific ID
//   POST /users => create or save data to DB
//   PATCH /users/:id => update data to DB
//   DELETE /users/:id => delete data to DB