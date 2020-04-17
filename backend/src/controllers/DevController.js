const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// index, show, store, update, destroy

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, tecnologias, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            let { name = login, avatar_url, bio } = apiResponse.data
            name = apiResponse.data.name || apiResponse.data.login

            const tecnologiasArray = parseStringAsArray(tecnologias)

            console.log(name, avatar_url, bio, github_username)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                tecnologias: tecnologiasArray,
                location
            })

            // Filtrar as conexões que estão há no máximo 10km de distancia e tecnologias

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                tecnologiasArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

        }

        return res.json(dev)
    }
}