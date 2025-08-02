// scripts/claim.js
require("dotenv").config();
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const htlc = await ethers.getContractAt("TwinLockSwapEth", process.env.HTLC_ADDRESS, wallet);

    const secret = process.env.SECRET; // plaintext secret revealed on Tron side

    const claimTx = await htlc.claim(secret);
    const receipt = await claimTx.wait();
    console.log("🎉 Claimed tokens! Tx Hash:", receipt.hash);
}

main().catch(err => {
    console.error("❌ Claim failed:", err);
    process.exit(1);
});
