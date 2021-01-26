import { ErrorResponse } from './errorResponse.js'
import { getLogger } from './logger.js'
const log = getLogger()

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  // log to console for dev
  process.env.NODE_ENV === 'production' ? null : log.error(err.stack)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }
  // Mongoose dublicate Key
  if (err.code === 11000) {
    error = new ErrorResponse(`Dublicated field valued entered`, 400)
  }
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error || 'Server Error',
  })
}

export { notFound, errorHandler }
