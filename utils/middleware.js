const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)

  console.log("error name: ", error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    console.log("content too short");
    return response.status(422).send({
      error: error.message
    })
  } 

  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}