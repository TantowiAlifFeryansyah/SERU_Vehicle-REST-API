const { Pricelist, User, Vehicle_brand, Vehicle_models, Vehicle_types, Vehicle_years } = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class Controller {
    static async register(req, res, next) {
        try {
            const { name, password, is_admin } = req.body

            // Check if user with the same name already exists
            const checkData = await User.findOne({ where: { name } });
            if (checkData) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const data = await User.create({ name, password, is_admin });
            res.status(201).json({ message: 'User registered successfully', data })
        } catch (error) {
            console.error('Error registering user:', error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { name, password } = req.body;
            const data = await User.findOne({ where: { name: name } });
            if (!data) {
                res.status(400).json({ message: 'Required Email or Password' })
            }
            const passCheck = bcrypt.compareSync(password, data.dataValues.password);
            if (data && passCheck) {
                delete data.dataValues.password
                const aksesToken = jwt.sign({ id: data.dataValues.id, user: data.dataValues.name }, process.env.key)
                res.status(200).json({ message: 'User login successful', aksesToken })
            } else if (data && !passCheck) {
                res.status(401).json({ message: 'Invalid username or password' })
            } else {
                res.status(401).json({ message: 'Invalid username or password' })
            }
        } catch (error) {
            console.error('Error logging user:', error);
            next(error)
        }
    }

    static async getData(req, res, next) {
        try {
            const data = await User.findAll()
            res.status(200).json({ message: 'Get Data', data })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getDataId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await User.findByPk(userId)
            if (data) {
                res.status(200).json({ message: 'Get Data', data })
            } else {
                res.status(200).json({ message: 'User not found', data })
            }
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, is_admin } = req.body
            const data = await User.update({ name, is_admin }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating user successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const data = await User.destroy({ where: { id } })
            res.status(200).json({ message: 'User deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

}

module.exports = Controller;
