import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  it("Should set the right unlockTime", async function () {
    const lockedAmount = ethers.parseEther("1");
    const unlockTime = (await time.latest()) + 60;
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
});
