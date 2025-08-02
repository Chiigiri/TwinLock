const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("🚀 Deploying HTLC with account:", deployer.address);

    const HTLC = await hre.ethers.getContractFactory("TwinLockSwapEth");
    const htlc = await HTLC.deploy();

    await htlc.waitForDeployment(); // ✅ new style in Hardhat v3+

    const htlcAddress = await htlc.getAddress();
    console.log("✅ HTLC contract deployed to:", htlcAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
