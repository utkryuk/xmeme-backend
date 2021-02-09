const memesRouter = require('express').Router()
const Meme = require('../models/meme')

memesRouter.get('/', async (request, response) => {
    
    const allMemes = await Meme.find({})
    return response.json(allMemes)
})

memesRouter.post('/', async (request, response) => {

    const body = request.body

    const newMeme = new Meme({
        name: body.name,
        url: body.url,
        caption: body.caption
    })

    const savedMeme = await newMeme.save()

    // const returnObj = {
    //     'id': savedMeme._id.toString()
    // }

    return response.json(savedMeme)
})

memesRouter.get('/:id', async (request, response, next) => {

    try {

        const getAMeme = await Meme.findById(request.params.id)
        return response.json(getAMeme)
    }
    catch(exception) {
        next(exception)
    }

})

module.exports = memesRouter