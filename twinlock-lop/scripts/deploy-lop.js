const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying with:", deployer.address);

    const LimitOrderProtocol = await ethers.getContractFactory("LimitOrderProtocol");

    // Sepolia WETH address
    const WETH_SEPOLIA = "0xdd13E55209Fd76AfE204dBda4007C227904f0a81";

    // Deploy with constructor arg
    const contract = await LimitOrderProtocol.deploy(WETH_SEPOLIA);

    // Wait for deployment to complete
    await contract.waitForDeployment(); // 🧠 the correct method in ethers v6+

    console.log("✅ LimitOrderProtocol deployed to:", await contract.getAddress());
}

main().catch((error) => {
    console.error("❌ Error deploying:", error);
    process.exitCode = 1;
});
