const { request } = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models')

async function authentication(req, res, next){
    try {
        const {aksestoken} = req.headers
        const payload = jwt.verify(aksestoken, process.env.key)
        const data = await User.findOne({where: {name: payload.user}})
        req.user = {id: data.dataValues.id, name: data.dataValues.name}
        next()
    }
    catch(error) {
        next(error)
    }
}

module.exports = authentication;