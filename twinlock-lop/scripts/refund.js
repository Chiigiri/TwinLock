// scripts/refund.js
require("dotenv").config();
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const htlc = await ethers.getContractAt("TwinLockSwapEth", process.env.HTLC_ADDRESS, wallet);

    const refundTx = await htlc.refund();
    const receipt = await refundTx.wait();
    console.log("💸 Refunded tokens. Tx Hash:", receipt.hash);
}

main().catch(err => {
    console.error("❌ Refund failed:", err);
    process.exit(1);
});
