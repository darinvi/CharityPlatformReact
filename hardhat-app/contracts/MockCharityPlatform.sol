// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import './Campaign.sol';
import './CampaignInterface.sol';

contract MockCharityPlatform {

    event CampaignCreated(uint indexed id, address indexed campaign);
    event DonationMade(uint indexed id, address indexed donator, uint amount);
    event Refund(uint indexed id, address indexed donator, uint amount);

    //campaign id -> all donations
    mapping (uint => address[]) donations;
    //id -> campaign
    mapping (uint => address) campaigns;
    //campaign id -> collected or not
    mapping (uint => bool) collectedFunds;
    //campaign id -> donator -> amount
    mapping (uint => mapping (address => bool)) private alreadyRefunded;

    uint public currCharity;
    
    function createCharity(
    string memory name,
    string memory description,
    uint fundingGoal,
    uint duration)
    external {
        campaigns[currCharity] = address(new Campaign(name,description,fundingGoal,duration,msg.sender));
        emit CampaignCreated(currCharity, campaigns[currCharity]);
        currCharity++;
    }

    function donate(uint _id) external payable {
        address campaign = campaigns[_id];
        require(msg.value + CampaignInterface(campaign).totalSupply() <= CampaignInterface(campaign).maxSupply() && msg.value > 0,"campaign has reached its goal");
        require(block.timestamp < CampaignInterface(campaign).deadline(),"campaign expired");
        
        //the mint will aso trigger nft creation for the donator
        CampaignInterface(campaign).mint(msg.sender,msg.value);
        
        donations[_id].push(msg.sender);

        emit DonationMade(_id, msg.sender, msg.value);
    }

    function collectFunds(uint id, address to) external {
        address campaign = campaigns[id];
        require(msg.sender == CampaignInterface(campaign).creator(),"Only creator can collect");
        require(!collectedFunds[id],"Already collected"); //check
        require(CampaignInterface(campaign).totalSupply() == CampaignInterface(campaign).maxSupply(),"campaign is not successful");

        collectedFunds[id] = true; //effect

        (bool success, ) = to.call{value: CampaignInterface(campaign).maxSupply()}(""); //interaction
        require(success,"err");
    }

    // refunds to everyone
    function refundAll(uint id) external {
        address campaign = campaigns[id];
        require(block.timestamp > CampaignInterface(campaign).deadline(),"campaign hasn't expired");
        require(CampaignInterface(campaign).totalSupply() < CampaignInterface(campaign).maxSupply(),"Can't refund successful campaign");

        for (uint i; i < donations[id].length; i++){
            address donator = donations[id][i];
            if (!alreadyRefunded[id][donator] && CampaignInterface(campaign).balanceOf(donator) > 0){ //check
                alreadyRefunded[id][donator] = true; //effct
                (bool success,) = donator.call{value:CampaignInterface(campaign).balanceOf(donator)}(""); //interaction
                require(success,"err");
            }
        }
    }

    // only refunds to the msg.sender
    function refund(uint id) external {
        address campaign = campaigns[id];
        uint balance = CampaignInterface(campaign).balanceOf(msg.sender);
        require(block.timestamp > CampaignInterface(campaign).deadline(),"campaign hasn't expired");
        require(CampaignInterface(campaign).totalSupply() < CampaignInterface(campaign).maxSupply(),"Can't refund successful campaign");
        require(balance > 0 && !alreadyRefunded[id][msg.sender],"Haven't donated or already refunded"); //check
        
        alreadyRefunded[id][msg.sender] = true; //effct

        (bool success,) = msg.sender.call{value:balance}(""); //interaction
        require(success,"err");

        emit Refund(id, msg.sender, balance);
    }


    //FUNCTIONS USED FOR TESTING
    function getCampaignAddress(uint id) external view returns(address){
        return campaigns[id];
    }

    function getCampaignBalance(uint id) external view returns(uint){
        return CampaignInterface(campaigns[id]).totalSupply();
    }
}