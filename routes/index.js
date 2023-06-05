var express = require('express');
var router = express.Router();
const authentication = require('../middleware/auth')
const controller = require('../controller')

/* Create Vehicle */
// ================================================

// GET /vehicle
router.get('/vehicle/brands', controller.getBrands);
router.get('/vehicle/id', controller.getBrandId);

router.get('/vehicle/types', controller.getTypes);
router.get('/vehicle/id', controller.getTypesId);

router.get('/vehicle', controller.getModels);
router.get('/vehicle/id', controller.getModelsId);

router.get('/vehicle/models', controller.getYearsId);
router.get('/vehicle/id', controller.getYearsId);

router.get('/vehicle/pricelist', controller.getPricelist);
router.get('/vehicle/id', controller.getPricelistId);

// POST /vehicle
router.post('/vehicle/brands', controller.createBrands);
router.post('/vehicle/types', controller.createTypes);
router.post('/vehicle/models', controller.createModels);
router.post('/vehicle/years', controller.createYears);
router.post('/vehicle/pricelist', controller.createPricelist);

// PATCH /vehicle/:id
router.patch('/vehicle/:id', controller.updateBrands);
router.patch('/vehicle/:id', controller.updateTypes);
router.patch('/vehicle/:id', controller.updateModels);
router.patch('/vehicle/:id', controller.updateYears);
router.patch('/vehicle/:id', controller.updatePricelist);

// DELETE /vehicle/:id
router.delete('/vehicle/:id', controller.deleteBrands);
router.delete('/vehicle/:id', controller.deleteTypes);
router.delete('/vehicle/:id', controller.deleteModels);
router.delete('/vehicle/:id', controller.deleteYears);
router.delete('/vehicle/:id', controller.deletePricelist);

// ================================================

/* Create Users */
// ================================================

// GET /users
router.get('/users', controller.getData);

// GET /users/:id
router.get('/users/:id', controller.getDataId);

// POST /users/register
router.post('/users/register', controller.register);

// POST /users/login || // POST /users
router.post('/users/login', controller.login);
router.use(authentication)

// PATCH /users/:id
router.patch('/users/:id', controller.update);

// DELETE /users/:id
router.delete('/users/:id', controller.delete);

// ================================================

module.exports = router;


// GET /users => retrieved all users
//   GET /users/:id => retrieved user with spesific ID
//   POST /users => create or save data to DB
//   PATCH /users/:id => update data to DB
//   DELETE /users/:id => delete data to DB