To start the back end servers:
    open 5 terminals. all should be in the backend folder.
    run one in each terminal - node gateway.js, node server.js, node visionServer.js, node costcoServer.js, node imageServer.js

    1 Some might come up with errors. look at the top of the error for the name of missing module. (make sure you are in the backend folder)
    2 run npm i <name of missing module> 
    
    repeat steps 1 and 2 until all servers start and run.

    after that, it is possible to use pm2 to start all 5 servers in the background
    pm2 will keep all servers running until command: "pm2 kill" is entered. that command
    can be entered from any terminal from any location.
    to start all 5 servers with pm2 use command: "pm2 start process.config.js"