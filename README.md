## About
This is a quick example of using hapi-pino in @hapi/hapi. I've forked from [hapi-pino](https://github.com/pinojs/hapi-pino) into [https://github.com/midnightcodr/hapi-pino](https://github.com/midnightcodr/hapi-pino) to support dynamic level update.

To verify dynamic update feature, do
1) start the process, `node main.js`, you should be able to find out the pid from the console output
2) `curl localhost:3000/hello`, you should not see the line `some debug info here` being printed on the console
3) When server starts, the initial loglevel is written to `/tmp/loglevel.pid`. To change to a different one, you can simply do, for example (substitute `pid` with the actual pid of the process)
    ```
    ./chg.sh pid debug
    ```

4) run step 2 again, the debug line should now be printed

