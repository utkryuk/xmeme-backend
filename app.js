const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json())

const memesRouter = require('./controllers/memes')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

const databaseConnect = async (mongoUrl) => {
    
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        logger.info('Connected to MongoDB')
    }
    catch (exception){
        logger.error(exception)
    }
}

databaseConnect(mongoUrl)


app.use(middleware.requestLogger)

app.use('/memes', memesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app