task("get-addresses","Returns an array with all dummy addresses")
    .setAction(async(taskArgs, hre) =>{
        const [deployer, ...rest] = await hre.ethers.getSigners();

        let addresses = new Array;

        for (account of rest){
            addresses.push(account.address)
        }

        console.log(addresses)
    });