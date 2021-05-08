module.exports = [
  {
    path: '/hello',
    method: 'GET',
    handler (request) {
      // this won't show when inital default level is set to 'info'
      // to change log level on the fly
      // ./chg.sh PID debug
      // where PID is the process id of the main process
      request.server.logger.debug('some debug info here')
      return 'world'
    }
  }
]
