const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");


describe("CharityPlatform", function () {

    let deployer, firstUser, secondUser, thirdUser;

    this.beforeAll(async function () {

        [deployer, firstUser, secondUser, thirdUser] = await ethers.getSigners();
    })

    async function deployPlatform() {

        const CharityPlatformFactory = await ethers.getContractFactory("MockCharityPlatform", deployer);
        const platform = await CharityPlatformFactory.deploy();

        //ethers.utils.parseEther(val) used many times so returning it from toWei
        const goal = toWei("100");

        const creator = platform.connect(firstUser);

        return { platform, creator, goal };
    }

    async function createShortCampaign() {
        const { platform, creator, goal } = await loadFixture(deployPlatform);
        const five_seconds = 5;
        await creator.createCharity("someName", "someDescription", goal, five_seconds);
        return { platform }
    }

    async function createLongCampaign() {
        const { platform, creator, goal } = await loadFixture(deployPlatform);
        const twenty_four_hours = 86_400;
        await creator.createCharity("someName", "someDescription", goal, twenty_four_hours);
        return { platform }
    }

    describe("Donation", function () {
        it("Should revert if donation exceeds remainder to goal", async function () {
            const { platform } = await loadFixture(createLongCampaign);

            const currUser = await platform.connect(firstUser);

            const amount = toWei("101");

            try {
                await currUser.distribute(0, { value: price });
            }
            catch (error) {
                expectRevert(error, "campaign has reached its goal");
            }
        });


        it("Should revert if campaign expired", async function () {
            const { platform } = await loadFixture(createShortCampaign);

            const currUser = await platform.connect(firstUser);

            const amount = toWei("10");

            delay(6000);

            expect(await currUser.donate(0, { value: amount })).to.be.revertedWith("campaign expired")

        });


        it("should succeed", async function () {
            const { platform } = await loadFixture(createLongCampaign);

            const currUser = await platform.connect(firstUser);

            const amount = toWei("10");

            await currUser.donate(0, { value: amount })
            
            expect(BigInt(await currUser.getCampaignBalance(0))).to.equal(amount);
            
        });
    });

    describe("collectFunds", function () {
        it("Should revert if not called by creator", async function () {

            const { platform } = await loadFixture(createLongCampaign);
            
            let currUser = await platform.connect(secondUser);

            currUser = await platform.connect(deployer)

            try {
                await currUser.collectFunds(0,secondUser.address);
            }
            catch (error) {
                expectRevert(error, "Only creator can collect");
            }
        });


        it("Should revert if already collected", async function () {

            const { platform } = await loadFixture(createLongCampaign);
            
            let currUser = await platform.connect(secondUser);
            
            // 100 is the funding goal
            const amount = toWei("100");
            await currUser.donate(0, { value: amount });

            currUser = await platform.connect(firstUser)
            await currUser.collectFunds(0, firstUser.address);
            
            try {
                await currUser.collectFunds(0, firstUser.address);
            }
            catch (error) {
                expectRevert(error, "Already collected");
            }

        });


        it("Should succeed", async function () {

            const { platform } = await loadFixture(createLongCampaign);
            
            let currUser = await platform.connect(secondUser);
            
            // 100 is the funding goal
            const amount = toWei("100");
            await currUser.donate(0, { value: amount });

            const balanceBefore = BigInt(await ethers.provider.getBalance(firstUser.address));

            currUser = await platform.connect(firstUser)
            await currUser.collectFunds(0, firstUser.address);

            const balanceAfter = BigInt(await ethers.provider.getBalance(firstUser.address));
            
            expect(balanceBefore < balanceAfter).to.equal(true);

        });
    });
});


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function toWei(val) {
    return ethers.utils.parseEther(val);
}