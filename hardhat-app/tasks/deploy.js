task("deploy","Deploy")
    .addParam('deployer','Address of deployer')
    .setAction(async(taskArgs, hre) =>{
        // const [deployer] = await hre.ethers.getSigners();
        const CrowdFundingPlatformFactory = await hre.ethers.getContractFactory("CharityPlatform",taskArgs.deployer);
        
        const platform = await CrowdFundingPlatformFactory.deploy();
        
        await platform.deployed();

        console.log(`platform deployed to ${platform.address} with owner ${taskArgs.deployer}`);
    });