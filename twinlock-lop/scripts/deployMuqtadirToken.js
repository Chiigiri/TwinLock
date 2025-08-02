// scripts/deployMuqtadirToken.js
const { ethers } = require("hardhat");

async function main() {

    const Token = await ethers.getContractFactory("MuqtadirToken");
    const totalSupply = ethers.parseEther("1000000");
    const token = await Token.deploy(totalSupply);

    await token.waitForDeployment();
    console.log("MuqtadirToken deployed to:", await token.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
