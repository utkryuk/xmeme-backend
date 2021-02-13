const memesRouter = require('express').Router()
const Meme = require('../models/meme')

memesRouter.get('/', async (request, response) => {
    
    let allMemes = await Meme.find({})

    if (allMemes.length > 100) {
        allMemes = allMemes.slice(0, 100)
    }

    return response.json(allMemes.reverse())
})

memesRouter.post('/', async (request, response, next) => {

    const body = request.body

    const newMeme = new Meme({
        name: body.name,
        url: body.url,
        caption: body.caption
    })

    try {
        const savedMeme = await newMeme.save()
        // const returnObj = {
        //     'id': savedMeme._id.toString()
        // }
        return response.json(savedMeme)
    }
    catch (exception) {
        next(exception)
    }
    
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