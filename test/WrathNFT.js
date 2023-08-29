const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("WrathNFT Test", function () {
  let deployer, user1, user2;

 // Test Variables
  const DEPLOYER_MINT = 6;
  const USER1_MINT = 2;
  const MINT_PRICE = ethers.parseEther("0.5");

  before(async function () {

   // Contract being deployed
    [deployer, user1, user2] = await ethers.getSigners();

    // Deploying contract
    const WrathNFTFactory = await ethers.getContractFactory(
      "WrathNFT",
      deployer
    );
    this.nft = await WrathNFTFactory.deploy();
  });
  // Test that the contract is deployed
  it("Minting Tests", async function () {
    // Minting 5 tokens for deployer
    for (let i = 0; i < DEPLOYER_MINT; i++) {
      await this.nft.mint({ value: MINT_PRICE });
    }
    // Minting 2 tokens for user1
    for (let i = 0; i < USER1_MINT; i++) {
      await this.nft.connect(user1).mint({ value: MINT_PRICE });
    }
    // Checking that deployer owns 6 tokens
    expect(await this.nft.balanceOf(deployer.address)).to.equal(DEPLOYER_MINT);
    // Checking that user1 owns 2 tokens
    expect(await this.nft.balanceOf(user1.address)).to.equal(USER1_MINT);
  });

  it("Transfers Tests", async function () {
    // Deployer approves User1 to spend tokenId 7
    await this.nft.connect(user1).transferFrom(user1.address, user2.address, 7);
    // Checking token7 is owned by user2
    expect(await this.nft.ownerOf(7)).to.equal(user2.address);
    // Approving User1 to spend tokenId 2
    await this.nft.approve(user1.address, 2);
    // Checking that User1 is approved to spend tokenId 2
    expect(await this.nft.getApproved(2)).to.equal(user1.address);
    // Transferring tokenId 2 from deployer to user1
    await this.nft
      .connect(user1)
      .transferFrom(deployer.address, user1.address, 2);
    // Checking that user1 owns tokenId 2
    expect(await this.nft.ownerOf(2)).to.equal(user1.address);
    // Checking balances after transfer
    expect(await this.nft.balanceOf(deployer.address)).to.equal(
      DEPLOYER_MINT - 1
    );
    // expect(await this.nft.balanceOf(user1.address)).to.equal(USER1_MINT + 1);
    // Checking that user1 can't transfer token that he doesn't own
    await expect(this.nft.connect(user1).transferFrom(deployer.address, user1.address, 4)).to.be.revertedWithPanic;});

  it("Burn Tests", async function () {
    // User1 burns tokenId 2
    await this.nft.connect(user1).burn(2);
    // // Checking that tokenId 2 is burned
    // expect(await this.nft.exists(2)).to.equal(false);
    // Checking that user1 can't burn token that he doesn't own
    await expect(this.nft.connect(user1).burn(3)).to.be.revertedWithPanic;
  });
});
