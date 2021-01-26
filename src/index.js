import dotenv from 'dotenv'
import express from 'express'
import { initLogger, getLogger } from './utils/logger.js'
import log4js from 'log4js'

// security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'

import { notFound, errorHandler } from './utils/error.middleware.js'
import { envCheck } from './utils/envCheck.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// // Routers
import statsRoutes from './routes/statesRoute.js'

let server

const log = initLogger()
dotenv.config()
const app = express()

envCheck()

// Server setup
const port = process.env.PORT || 3000
app.set('port', port)
// add body-parser support and basic setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup logger on all http requests but
// ignore every request to /v1/services/ping
app.use(log4js.connectLogger(log, { level: 'auto', nolog: 'ping' }))

app.use(express.json({ limit: process.env.BODYLIMIT }))

// START App security
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cors(process.env.CORS))
// END Security

app.use('/v1/stats', statsRoutes)

app.use(notFound)
app.use(errorHandler)

server = app.listen(process.env.PORT || 5000, () => {
  log.info(`Server running on port ${port}`)
  log.info(`Server is running in ${process.env.NODE_ENV} environment.`)
})

process.on('SIGTERM', () => {
  log.warn('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
  // start graceul shutdown here
  shutdown()
})

const shutdown = async () => {
  try {
    await server.close()
    log.info('server connections are closed')
    process.exit(0)
  } catch (err) {
    log.error(err.message)
    process.exit(1)
  }
}
