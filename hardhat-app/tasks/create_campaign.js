task("create-campaign", "Create a campaign")
    .addParam('platform', 'The address of the charity platform')
    .addParam('account', "The signer of the transaction")
    .addParam('name', 'Name of campaign')
    .addParam('description', 'Description of campaign')
    .addParam('goal', 'Funding-goal of campaign')
    .addParam('duration', 'Duration of campaign')
    .setAction(async (taskArgs, hre) => {

        const CharityPlatform = await hre.ethers.getContractFactory("CharityPlatform")

        const platform = new hre.ethers.Contract(
            taskArgs.platform,
            CharityPlatform.interface,
            await hre.ethers.getSigner(taskArgs.account)
        );

        const tx = await platform.createCharity(
            taskArgs.name,
            taskArgs.description,
            taskArgs.goal,
            taskArgs.duration
        );

        await tx.wait();
        
        const campaignAddress = await platform.getCampaignAddress(await platform.currCharity() - 1);

        console.log(campaignAddress);
    });
