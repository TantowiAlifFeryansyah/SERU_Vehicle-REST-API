const { Pricelist, User, Vehicle_brands, Vehicle_models, Vehicle_types, Vehicle_years } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                res.status(200).json({ message: 'User login successful', data, aksesToken })
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
            res.status(200).json({ message: 'User deleted successfully.',data })
        } catch (error) {
            console.error('error deleting:', error);
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await User.count()
            const pages = Math.ceil(total / limit)

            const data = await User.findAll()
            res.status(200).json({ message: 'Get User',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getUserId(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await User.count()
            const pages = Math.ceil(total / limit)

            const userId = req.params.id;
            const data = await User.findByPk(userId)
            if (data) {
                res.status(200).json({ message: 'Get Data',total, pages, offset, data })
            } else {
                res.status(200).json({ message: 'User not found', data })
            }
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async createVehicle(req, res, next) {
        try {
            const { vehicleBrand, vehicleType, vehicleModel, vehicleYear } = req.body
            const brand = await Vehicle_brands.create({ name: vehicleBrand });
            const type = await Vehicle_types.create({ name: vehicleType, brand_id: brand.id });
            const model = await Vehicle_models.create({ name: vehicleModel, type_id: type.id });
            const year = await Vehicle_years.create({ name: vehicleYear });
            const price = await Pricelist.create({ year_id: year.id, model_id: model.id });
            res.status(201).json({ message: 'vehicle_brandssuccessfully created' })
        } catch (error) {
            console.error('error creating:', error);
            next(error)
        }
    }

    static async updateVehicle(req, res, next) {
        try {
            const { id } = req.params
            const { vehicleBrand, vehicleType, vehicleModel, vehicleYear } = req.body
            const brand = await Vehicle_brands.findByPk(id);
            const type = await Vehicle_types.findOne({ where: { brand_id: brand.id } });
            const model = await Vehicle_models.findOne({ where: { type_id: type.id } });
            const year = await Vehicle_years.findOne({ id: brand.id });
            const price = await Pricelist.findOne({ where: { year_id: year.id } });

            await brand.update({ name: vehicleBrand });
            await type.update({ name: vehicleType });
            await model.update({ name: vehicleModel });
            await year.update({ name: vehicleYear });

            res.status(200).json({ message: 'Vehicle updated successfully' })
        } catch (error) {
            console.error('Error updating vehicle:', error);
            next(error)
        }
    }

    static async deleteVehicle(req, res, next) {
        try {
            const { id } = req.params
            const vehicle = await Vehicle_brands.destroy({ where: { id } });
            res.status(200).json({ message: 'Vehicle deleted successfully', vehicle })
        } catch (error) {
            console.error('Error deleting:', error);
            next(error)
        }
    }

    static async getVehicle(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_brands.count()
            const pages = Math.ceil(total / limit)

            const brands = await Vehicle_brands.findAll({
                include: [
                    {
                        model: Vehicle_types,
                        include: [
                            {
                                model: Vehicle_models,
                                include: [
                                    {
                                        model: Pricelist,
                                        include: [Vehicle_years],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
            res.status(200).json({ message: 'Get Vehicle',total, pages, offset, brands })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehicleId(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_brands.count()
            const pages = Math.ceil(total / limit)

            const vehicleId = req.params.id;
            const brand = await Vehicle_brands.findByPk(vehicleId, {
                include: [
                    {
                        model: Vehicle_types,
                        include: [
                            {
                                model: Vehicle_models,
                                include: [
                                    {
                                        model: Pricelist,
                                        include: [Vehicle_years],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
            res.status(200).json({ message: 'Get Vehicle By Id',total, pages, offset, brand })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehicleBrand(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_brands.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_brands.findAll()
            res.status(200).json({ message: 'Get Vehicle Brands',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehicleType(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_types.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_types.findAll()
            res.status(200).json({ message: 'Get Vehicle Types',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehicleModel(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_models.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_models.findAll()
            res.status(200).json({ message: 'Get Vehicle Models',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehicleYear(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Vehicle_years.count()
            const pages = Math.ceil(total / limit)

            const data = await Vehicle_years.findAll()
            res.status(200).json({ message: 'Get Vehicle Years',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async getVehiclePricelist(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 3
            const offset = (page - 1) * limit
        
            const total = await Pricelist.count()
            const pages = Math.ceil(total / limit)

            const data = await Pricelist.findAll()
            res.status(200).json({ message: 'Get Vehicle Pricelist',total, pages, offset, data })
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async updateVehicleBrand(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Vehicle_brands.update({ name }, {
                where: { id }
            })
            res.status(200).json({ message: 'Update Vehicle Brands', data });
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async updateVehicleType(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Vehicle_types.update({ name }, {
                where: { id }
            })
            res.status(200).json({ message: 'Update Vehicle Type', data });
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async updateVehicleModel(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Vehicle_models.update({ name }, {
                where: { id }
            })
            res.status(200).json({ message: 'Update Vehicle Model', data });
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }

    static async updateVehicleYear(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Vehicle_years.update({ name }, {
                where: { id }
            })
            res.status(200).json({ message: 'Update Vehicle Year', data });
        } catch (error) {
            console.error('Internal server error:', error);
            next(error)
        }
    }


}

module.exports = Controller;
