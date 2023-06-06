task("donate","Donate to a campaign")
    .addParam('platform','Address of the platform')
    .addParam('account','The signer of the donation')
    .addParam('id','The id of the campaign')
    .addParam('value','Amount to donate')
    .setAction(async(taskArgs, hre) =>{

        const CharityPlatform = await hre.ethers.getContractFactory("MockCharityPlatform");
        
        const platform = new hre.ethers.Contract(
            taskArgs.platform,
            CharityPlatform.interface,
            await hre.ethers.getSigner(taskArgs.account)
        );
        
        const tx = await platform.donate(parseInt(taskArgs.id),{value: hre.ethers.utils.parseEther(taskArgs.value)});
    });