const { Contract } = require("ethers");

task("list-contracts", "List all deployed contracts")
  .setAction(async (taskArgs, hre) => {
    // Get the network name from the Hardhat runtime environment
    // const network = hre.network.name;

    // Get the deployment information for the current network
    // const { deployments } = hre;
    // const deployedContracts = await hre.deployments.all();
    const contracts = await hre.ethers.getContracts();

    console.log(contracts);

    // deployedContracts.forEach((contract) => {
    //   console.log(`- ${contract.contractName}: ${contract.address}`);
    // });
  });