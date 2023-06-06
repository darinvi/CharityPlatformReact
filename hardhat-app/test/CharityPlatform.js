const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");


describe("CharityPlatform", function () {
  
  let charityPlatformUser, deployer, firstUser, secondUser, thirdUser;
  
  this.beforeAll(async function () {
    
    [deployer, firstUser, secondUser, thirdUser] = await ethers.getSigners();
    
    // const { platform } = await loadFixture(deployPlatform);
    // charityPlatformUser = getFirstUserCharityPlatform(platform, firstUser);
  })

  async function deployPlatform() {
    
    const CharityPlatformFactory = await ethers.getContractFactory("CharityPlatform", deployer);
    const platform = await CharityPlatformFactory.deploy();

    //ethers.utils.parseEther(val) used many times so returning it from toWei
    const goal = toWei("100");

    const creator = platform.connect(firstUser);

    return { platform, creator, goal };
  }

  async function createShortCampaign() {
    const { platform, creator, goal} = await loadFixture(deployPlatform);
    const five_seconds = 5;
    await creator.createCharity("someName","someDescription",goal,five_seconds);
    return {platform}
  }

  async function makeContributions() {
    const {platform} = await loadFixture(createShortCampaign)
    
    // const dividents = toWei("10");
    const price = toWei("1");
    
    for (const user of [secondUser,thirdUser]){
      const currUser = platform.connect(user);
      await currUser.contribute(0,{value: price});        
    }

    return {platform}
  }

  describe("Refund", function () {
    it("Should succeed",async function () {
      const { platform } = await loadFixture(makeContributions);

      const charityPlatformUser = await platform.connect(firstUser);

      //make sure the contributions have been succesfull.
      expect(await charityPlatformUser.testTotalSupplyGetter(0)).to.equal(toWei("2"));
      
      //wait for the short campaign to expire
      await delay(5000);
      
      await charityPlatformUser.refund(0);      

      //make sure the funds have really been returned.
      expect(await charityPlatformUser.testTotalSupplyGetter(0)).to.equal(0);
      
    });
  });

  describe("Distributions", function () {
    it("Should revert if not called by creator",async function () {

      const { platform } = await loadFixture(makeContributions);
      const currUser = await platform.connect(secondUser);
      
      const price = toWei("5");
      
      try {
        await currUser.distribute(0, {value: price});
      } 
      catch (error) {
        expectRevert(error, "Only the creator can distribute");
      }
    });
    
    it("should succeed",async function () {
      const { platform } = await loadFixture(makeContributions);
      
      //connecting the creator after making contributions with other accounts
      const charityPlatformUser = platform.connect(firstUser);
      
      //first calling 
      let balance = BigInt(await ethers.provider.getBalance(secondUser.address));

      await expect(balance < toWei("10000")).to.equal(true);

      await charityPlatformUser.distribute(0, {value: toWei("10")});
      
      balance = BigInt(await ethers.provider.getBalance(secondUser.address));
      await expect(balance > toWei("10000")).to.equal(true);
      
    });


  });
});


async function getFirstUserCharityPlatform(platform, firstUser) {
  return platform.connect(firstUser)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toWei(val) {
  return ethers.utils.parseEther(val);
}