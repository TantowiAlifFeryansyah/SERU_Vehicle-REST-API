var express = require('express');
var router = express.Router();
const authentication = require('../middleware/auth')
const controller = require('../controller')

/* GET home page. */


// GET /users
router.get('/users', controller.getData);

// GET /users/:id
router.get('/users/:id', controller.getDataId);

// GET /users/register
router.post('/users/register', controller.register);

// GET /users/login || // POST /users
router.post('/users/login', controller.login);
router.use(authentication)

// PATCH /users/:id
router.patch('/users/:id', controller.update);

// / DELETE /users/:id
router.delete('/users/:id', controller.delete);

module.exports = router;


// GET /users => retrieved all users
//   GET /users/:id => retrieved user with spesific ID
//   POST /users => create or save data to DB
//   PATCH /users/:id => update data to DB
//   DELETE /users/:id => delete data to DB