# CharityPlatformReact

1. cd .\hardhat-app\ to for the express server and hardhat node.

    - Run "npx hardhat node" in order to start the local persistent blockchain.
    - open new terminal. Run "node express_server.js" in order to start the express server.

2. cd .. back to the main directory.

3. cd .\react-frontend\ to start the react fronend app.

    -run "npm start".

Make sure all these apps work simultaniously and are started at the same time!

There are problems that I am about to address, but for now make sure that if the react app is refreshed, the hardhat app is also refreshed and vice versa! They should be started at the same time in order for the states to work properly together. That will be fixed.