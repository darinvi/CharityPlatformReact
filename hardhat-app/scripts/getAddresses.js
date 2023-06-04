const hre = require("hardhat");

async function main() {
  const [...allAccounts] = await hre.ethers.getSigners();

  let addresses = new Array;

  for (account of allAccounts){
    addresses.push(account.address);
  }

  console.log(addresses);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
