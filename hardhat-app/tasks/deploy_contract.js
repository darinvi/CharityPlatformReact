task("deploy-contract","Deploy a contract")
    .addParam('deployer','Address of deployer')
    .setAction(async(taskArgs, hre) =>{
        // const [deployer] = await hre.ethers.getSigners();
        const CharityPlatform = await hre.ethers.getContractFactory("MockCharityPlatform",taskArgs.deployer);
        
        const platform = await CharityPlatform.deploy();
        
        await platform.deployed();

        console.log(platform.address);
    });