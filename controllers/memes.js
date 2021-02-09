const memesRouter = require('express').Router()

// memesRouter.get('/', async (request, response) => {

//     const allMemes = await Meme.find({})

//     return response.json(allMemes)

// })

// memesRouter.post('/', async (request, response) => {

// })

// memesRouter.get('/:id', async (request, response) => {

//     const requiredMeme = await Meme.find()
// })

let memes = [
    {
        id: 1,
        name: 'MS Dhoni',
        url: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        caption: 'Meme for my place'
    },
    {
        id: 2,
        name: 'Virat',
        url: 'https://images.pexels.com/photos/3572382/pexels-photo-3573382.jpeg',
        caption: 'Meme for xmeme'
    }
]

memesRouter.get('/', async (request, response) => {
    
    return response.json(memes)
})

memesRouter.post('/', async (request, response) => {

    const body = request.body

    console.log(body)

    const new_meme = {
        id: body.id,
        name: body.name,
        url: body.url,
        caption: body.caption
    }

    memes = memes.concat(new_meme)
    return response.json(new_meme)
})

memesRouter.get('/:id', async (request, response) => {

    const id = Number(request.params.id)
    const meme = memes.find(meme => meme.id === id)

    if (meme) {
        return response.json(meme)
    }

    else {
        response.status(404).end()
    }
})

module.exports = memesRouter