const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

        // buscar todos os devs num raio de 10km
        // filtrar por tecnologias
module.exports = {
    async index(req, res) {
        const { nome, latitude, longitude, tecnologias } = req.query
        const tecnologiasArray = parseStringAsArray(tecnologias)
        const devs = await Dev.find({
            tecnologias: {
                $in: tecnologiasArray
            },
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

        return res.json({ devs })

    }
}