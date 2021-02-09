const mongoose = require('mongoose')

const memeSchema = mongoose.Schema({
    name: String,
    url: String,
    caption: String
})

memeSchema.set('toJSON', {
    transform : (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString(),
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Meme', memeSchema)