const { ethers } = require("hardhat");

async function main() {
    const ArbitraryStaticCall = await ethers.getContractFactory("ArbitraryStaticCall");
    const arbitrary = await ArbitraryStaticCall.deploy();
    await arbitrary.waitForDeployment();

    console.log("✅ ArbitraryStaticCall deployed to:", arbitrary.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
