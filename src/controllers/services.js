// @desc    Ping api
// @route   GET v1/services/ping
// @access  Public
const ping = (req, res, next) => {
  res.status(200).json({
    status: 'OK',
    time: new Date(),
  })
}

// @desc    Check API Version
// @route   GET v1/services/version
// @access  Public
const version = (req, res, next) => {
  res.status(200).json({
    apiVersion: process.env.VERSION,
    environment: process.env.NODE_ENV,
    time: new Date(),
  })
}

export { ping, version }
