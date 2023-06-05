const { Pricelist, User, Vehicle_brand, Vehicle_models, Vehicle_types, Vehicle_years } = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class Controller {

    // USER ==========================================================>
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

    // Vehicle ==========================================================>
    // Vehicle Brands
    static async createBrands(req, res, next) {
        try {
            const { name } = req.body
            const data = await Vehicle_brand.create({ name });
            res.status(201).json({ message: 'vehicle_brandssuccessfully created', data })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async getBrands(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            const offset = (page - 1) * limit

            const total = await Vehicle_brand.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_brand.findAll()
            res.status(200).json({ message: 'Get Data', data, total, limit, offset, pages, page })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getBrandId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await Vehicle_brand.findByPk(userId)
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

    static async updateBrands(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Vehicle_brand.update({ name }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async deleteBrands(req, res, next) {
        try {
            const { id } = req.params
            const data = await Vehicle_brand.destroy({ where: { id } })
            res.status(200).json({ message: 'Deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

    // Vehicle Types
    static async createTypes(req, res, next) {
        try {
            const { name, brand_id } = req.body
            const data = await Vehicle_types.create({ name, brand_id });
            res.status(201).json({ message: 'vehicle_brandssuccessfully created', data })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async getTypes(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            const offset = (page - 1) * limit

            const total = await Vehicle_types.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_types.findAll()
            res.status(200).json({ message: 'Get Data', data, total, limit, offset, pages, page })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getTypesId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await Vehicle_types.findByPk(userId)
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

    static async updateTypes(req, res, next) {
        try {
            const { id } = req.params
            const { name, brand_id } = req.body
            const data = await Vehicle_types.update({ name, brand_id }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async deleteTypes(req, res, next) {
        try {
            const { id } = req.params
            const data = await Vehicle_types.destroy({ where: { id } })
            res.status(200).json({ message: 'Deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

    // Vehicle Models
    static async createModels(req, res, next) {
        try {
            const { name, type_id } = req.body
            const data = await Vehicle_models.create({ name, type_id });
            res.status(201).json({ message: 'vehicle successfully created', data })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async getModels(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            const offset = (page - 1) * limit

            const total = await Vehicle_models.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_models.findAll()
            res.status(200).json({ message: 'Get Data', data, total, limit, offset, pages, page })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getModelsId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await Vehicle_models.findByPk(userId)
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

    static async updateModels(req, res, next) {
        try {
            const { id } = req.params
            const { name, type_id } = req.body
            const data = await Vehicle_models.update({ name, type_id }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async deleteModels(req, res, next) {
        try {
            const { id } = req.params
            const data = await Vehicle_models.destroy({ where: { id } })
            res.status(200).json({ message: 'Deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

    // Vehicle Years
    static async createYears(req, res, next) {
        try {
            const { year } = req.body
            const data = await Vehicle_years.create({ year });
            res.status(201).json({ message: 'vehicle successfully created', data })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async getYears(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            const offset = (page - 1) * limit

            const total = await Vehicle_years.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_years.findAll()
            res.status(200).json({ message: 'Get Data', data, total, limit, offset, pages, page })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getYearsId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await Vehicle_years.findByPk(userId)
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

    static async updateYears(req, res, next) {
        try {
            const { id } = req.params
            const { year } = req.body
            const data = await Vehicle_years.update({ year }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async deleteYears(req, res, next) {
        try {
            const { id } = req.params
            const data = await Vehicle_years.destroy({ where: { id } })
            res.status(200).json({ message: 'Deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

    // Vehicle Years
    static async createPricelist(req, res, next) {
        try {
            const { year_id, model_id } = req.body
            const data = await Pricelist.create({ year_id, model_id });
            res.status(201).json({ message: 'vehicle successfully created', data })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async getPricelist(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            const offset = (page - 1) * limit

            const total = await Pricelist.count()
            const pages = Math.ceil(total / limit)

            const data = await Pricelist.findAll()
            res.status(200).json({ message: 'Get Data', data, total, limit, offset, pages, page })

        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getPricelistId(req, res, next) {
        const userId = req.params.id;
        try {
            const data = await Pricelist.findByPk(userId)
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

    static async updatePricelist(req, res, next) {
        try {
            const { id } = req.params
            const { year } = req.body
            const data = await Pricelist.update({ year }, {
                where: { id }
            })
            res.status(200).json({ message: 'Uppdating successfully.', data })
        } catch (error) {
            console.error('error upddating:', error);
            next(error)
        }
    }

    static async deletePricelist(req, res, next) {
        try {
            const { id } = req.params
            const data = await Pricelist.destroy({ where: { id } })
            res.status(200).json({ message: 'Deleted successfully.', data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

}

module.exports = Controller;
