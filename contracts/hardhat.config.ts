import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "contracts",
    tests: "test",
    cache: "hardhat.cache",
    artifacts: "artifacts"
  }
};

export default config;
