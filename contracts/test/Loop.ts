import { expect } from "chai";
import { ethers } from "hardhat";

describe("Loop contracts", function () {
  it("deploys a loop and releases funds after validation", async function () {
    const [deployer, beneficiary, executor] = await ethers.getSigners();

    const Role = await ethers.getContractFactory("LoopRoleNFT");
    const role = await Role.deploy();

    const Oracle = await ethers.getContractFactory("LoopOracle");
    const oracle = await Oracle.deploy();

    const Factory = await ethers.getContractFactory("LoopFactory");
    const factory = await Factory.deploy(await role.getAddress(), await oracle.getAddress());

    await role.transferOwnership(await factory.getAddress());

    const tx = await factory.createLoop(beneficiary.address, [executor.address], [1]);
    const receipt = await tx.wait();
    const event = receipt!.logs.find((l) => l.fragment?.name === "LoopCreated");
    const vaultAddr = event?.args?.vault as string;

    expect(await role.ownerOf(1)).to.equal(executor.address);

    const vault = await ethers.getContractAt("LoopVault", vaultAddr);

    await deployer.sendTransaction({ to: vaultAddr, value: ethers.parseEther("1") });

    await expect(vault.release()).to.be.revertedWith("Not validated");

    await oracle.validate(vaultAddr);

    await expect(() => vault.release()).to.changeEtherBalances(
      [vault, beneficiary],
      [ethers.parseEther("-1"), ethers.parseEther("1")]
    );
  });
});
