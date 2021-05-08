const fs = require('fs')
const Hapi = require('@hapi/hapi')
const logLevelFile = `/tmp/loglevel.${process.pid}`
const server = Hapi.Server({
  port: 3030
})

const clearLog = () => {
  console.log(`removing ${logLevelFile}`)
  fs.rm(logLevelFile, () => {
    console.log('file removed')
  })
}
const setLogLevel = async logger => {
  console.info('Changing loglevel')
  const _newLevel = await fs.promises.readFile(logLevelFile, 'utf8')
  const newLevel = _newLevel.trim()
  console.log(`newLevel=${newLevel}`)
  if (
    !['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'].includes(
      newLevel
    )
  ) {
    console.error(`${newLevel} is not a valid log level`)
    return
  }
  logger.level = newLevel
  console.info(`Changed loglevel to ${newLevel}`)
}

const init = async () => {
  await server.register({
    plugin: require('hapi-pino')
  })
  fs.promises.writeFile(logLevelFile, server.logger.level)

  console.log(server.logger.level)
  server.route(require('./routes'))

  process.on('SIGUSR1', () => {
    setLogLevel(server.logger)
  })

  process.on('SIGINT', () => {
    console.log('stoppping server')
    server.stop({ timeout: 1000 })
  })

  server.events.on('stop', () => {
    clearLog()
  })

  await server.start()
  server.log(
    'main',
    `server started at ${server.info.uri} with a pid of ${process.pid}`
  )
}

init()
