import { expect } from "chai";
import { ethers } from "hardhat";

const ZERO = ethers.ZeroAddress;

describe("Loop contracts", function () {
  it("handles ETH deposit and release after oracle validation", async function () {
    const [deployer, beneficiary, depositor] = await ethers.getSigners();

    const Role = await ethers.getContractFactory("LoopRoleNFT");
    const role = await Role.deploy();
    const Oracle = await ethers.getContractFactory("LoopOracle");
    const oracle = await Oracle.deploy();
    const Factory = await ethers.getContractFactory("LoopFactory");
    const factory = await Factory.deploy(await role.getAddress(), await oracle.getAddress());

    const predicted = await factory.callStatic.createLoop(ZERO, beneficiary.address);
    await factory.createLoop(ZERO, beneficiary.address);
    const vault = await ethers.getContractAt("LoopVault", predicted);

    expect(await role.balanceOf(beneficiary.address)).to.equal(1n);
    await expect(
      role.connect(beneficiary).transferFrom(beneficiary.address, depositor.address, 1n)
    ).to.be.revertedWith("Soulbound");

    const depositAmount = ethers.parseEther("1");
    await vault.connect(depositor).deposit(0, { value: depositAmount });
    await expect(vault.connect(beneficiary).release()).to.be.revertedWith("Not approved");

    await oracle.validate(predicted);
    await expect(() => vault.connect(beneficiary).release()).to.changeEtherBalances(
      [vault, beneficiary],
      [-depositAmount, depositAmount]
    );
  });

  it("handles ERC20 deposit and release", async function () {
    const [deployer, beneficiary, depositor] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockERC20");
    const token = await Token.deploy();
    await token.mint(depositor.address, 1000n);

    const Role = await ethers.getContractFactory("LoopRoleNFT");
    const role = await Role.deploy();
    const Oracle = await ethers.getContractFactory("LoopOracle");
    const oracle = await Oracle.deploy();
    const Factory = await ethers.getContractFactory("LoopFactory");
    const factory = await Factory.deploy(await role.getAddress(), await oracle.getAddress());

    const predicted = await factory.callStatic.createLoop(await token.getAddress(), beneficiary.address);
    await factory.createLoop(await token.getAddress(), beneficiary.address);
    const vault = await ethers.getContractAt("LoopVault", predicted);

    await token.connect(depositor).approve(predicted, 500n);
    await vault.connect(depositor).deposit(500n);

    await expect(vault.release()).to.be.revertedWith("Not approved");
    await oracle.validate(predicted);
    await vault.release();
    expect(await token.balanceOf(beneficiary.address)).to.equal(500n);
  });
});
