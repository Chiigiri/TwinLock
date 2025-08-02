const { ethers } = require("hardhat");
const { LimitOrderBuilder } = require("@1inch/limit-order-protocol-utils");
require("dotenv").config();

async function main() {
    console.log("Starting order creation...");

    // 1. Initialize with 2025 parameters
    const builder = new LimitOrderBuilder({
        contractAddress: process.env.LOP_ADDRESS,
        chainId: 11155111,
        version: 'v6.5'
    });

    const [maker] = await ethers.getSigners();
    console.log("Maker address:", maker.address);

    // 2. Prepare order with 2025 required fields
    const order = {
        makerAsset: process.env.TOKEN_ADDRESS,
        takerAsset: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // MUST stay unchanged
        maker: maker.address,
        receiver: maker.address, // New mandatory field
        makingAmount: ethers.parseUnits("10", 18),
        takingAmount: ethers.parseUnits("1", 18),
        salt: Date.now().toString(),
        predicate: "0x", // Empty for basic orders
        permit: "0x", // No token permit
        interaction: "0x" // No callbacks
    };

    console.log("Order constructed, signing...");

    // 3. 2025 signing method
    const { signature, orderHash } = await builder.createAndSignOrder(order);

    console.log("✅ Order successfully created:", {
        order,
        signature,
        orderHash
    });

    // Save for claim.js
    require('fs').writeFileSync('order.json', JSON.stringify({
        order,
        signature,
        orderHash
    }, null, 2));
}

main().catch(error => {
    console.error("❌ Order creation failed:", error);
    process.exitCode = 1;
});