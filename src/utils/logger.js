import log4js from 'log4js'
let logger

const initLogger = () => {
  // set logger output on development and production level
  let outputs =
    process.env.NODE_ENV === 'development'
      ? ['console']
      : ['file', 'gelf', 'console']

  log4js.addLayout('json', (config) => {
    return function (logEvent) {
      return `${JSON.stringify(logEvent)},`
    }
  })

  log4js.configure({
    appenders: {
      gelf: {
        type: '@log4js-node/gelf',
        host: process.env.LOGGER_HOST,
        port: process.env.LOGGER_PORT,
        layout: {
          type: 'pattern',
          pattern: '%d %-5p %c [%m] (%f{1}) <%h>',
        },
      },
      console: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: '%[[%d]%] %-5p %c %m (%f{1})',
        },
      },
      file: {
        type: 'file',
        filename: 'app.log',
        maxLogSize: 52428800,
        backups: 10,
        layout: {
          type: 'pattern',
          pattern: '[%d] %-5p %c %m (%f{1})',
        },
      },
    },
    categories: {
      default: {
        appenders: outputs,
        enableCallStack: true,
        level: process.env.LOG_LEVEL || 'WARN',
      },
    },
  })
  logger = log4js.getLogger('EMU-proxy')
  return logger
}

const getLogger = () => {
  if (!logger) {
    initLogger()
    // throw new Error('Logger is not initialized!')
  }
  return logger
}

export { initLogger, getLogger }
