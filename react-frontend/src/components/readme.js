export default function Readme() {

    function handleButtonClick() {
        alert(`# CharityPlatformReact

        Node modules deleted due to SoftUni's upload limit! Make sure they are installed in both hardhat and react folders!
        
        1. cd .hardhat-app to for the express server and hardhat node.
            
            - Run "npm install"
            - Run "npx hardhat node" in order to start the local persistent blockchain.
            - open new terminal. Run "node express_server.js" in order to start the express server.
        
        2. cd .. back to the main directory.
        
        3. cd .react-frontend to start the react fronend app.
        
            - Run "npm install"
            - Run "npm start".
        
        Make sure all these apps work simultaniously and are started at the same time!`)
    }

    return (
        <div>
            <button onClick={handleButtonClick}>README.md</button>
        </div>
    );
}

