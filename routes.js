module.exports = [
  {
    path: '/hello',
    method: 'GET',
    handler (request) {
      // this won't show when inital default level is set to 'info'
      // to change log level on the fly
      // echo -n debug > /tmp/loglevel.PID
      // kill -SIGUSR1 PID
      // where PID is the process id of the main process
      request.server.logger.debug('some debug info here')
      return 'world'
    }
  }
]
