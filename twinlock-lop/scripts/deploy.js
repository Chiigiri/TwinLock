const hre = require("hardhat");

async function main() {
    const LOP_ADDRESS = "0x0463a1A59a3586c03ee38853F71536Dad570D173";

    const TwinLockSwapEth = await hre.ethers.getContractFactory("TwinLockSwapEth");
    const contract = await TwinLockSwapEth.deploy(LOP_ADDRESS);

    await contract.waitForDeployment(); // ✅ Use this instead of .deployed()

    console.log("TwinLockSwapEth deployed to:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
