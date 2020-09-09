const Maker = require('../models/Maker')
const parseStringAsArray = require('../utils/parseStringAsArray')

// buscar todos os devs num raio de 10km
// filtrar por tecnologias
module.exports = {
    async index(req, res) {

        const { latitude, longitude, filters } = req.query

        console.log(latitude, longitude, filters)

        const makers = await Maker.find({
            /*services: {
                $in: filters
            },*/
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })
        //const makers = await Maker.find();
        console.log(makers)

        return res.json(makers)

    }
}