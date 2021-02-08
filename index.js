require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

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

app.get('/memes', async (request, response) => {
    
    return response.json(memes)
})

app.post('/memes', async (request, response) => {

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

app.get('/memes/:id', async (request, response) => {

    const id = Number(request.params.id)
    const meme = memes.find(meme => meme.id === id)

    if (meme) {
        return response.json(meme)
    }

    else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})