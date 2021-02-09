const logger = require('./logger')

const requestLogger = (request, response, next) => {

    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({error: 'unknown Endpoint'})
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).json({error: 'malformatted id'})
    }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
}