const tronWeb = require('./scripts/tronweb');
const fs = require('fs');

// Load ABI from JSON file
const abi = JSON.parse(fs.readFileSync('./HTLC_ABI.json', 'utf8'));
const htlcAddress = 'TDXM1BDvgcfmBrjTHsLNk6R1DCdZeVmXTR';
const htlc = tronWeb.contract(abi, htlcAddress);

async function lockTrx() {
    const hashlock = '0x186797d51c3fd9bd3d063b198672a7d9ee8c97c33cfe41a7f270b7f85103a116';
    const receiver = 'TWkmwxhQrm4pEKQqiwUE7tqA9yZNFj5Yv7';
    const amountTRX = 5;
    const amountSun = tronWeb.toSun(amountTRX);
    const timelock = Math.floor(Date.now() / 1000) + 600; // 10 min later

    const sender = tronWeb.defaultAddress.base58;

    // --- Prepare Swap ID ---
    const senderHex = tronWeb.address.toHex(sender);
    const receiverHex = tronWeb.address.toHex(receiver);
    const timelockHex = tronWeb.toHex(timelock).replace(/^0x/, '').padStart(64, '0');
    const preimage = senderHex + receiverHex.slice(2) + hashlock.slice(2) + timelockHex;
    const swapId = tronWeb.sha3(preimage);

    console.log("\n🔑 Swap ID:     ", swapId);
    console.log("🔒 Hashlock:    ", hashlock);
    console.log("⏰ Timelock:    ", timelock, new Date(timelock * 1000).toLocaleString());
    console.log("💰 Amount (sun):", amountSun);

    try {
        const tx = await htlc.methods
            .lock(swapId, receiver, timelock, hashlock)
            .send({
                callValue: amountSun,
                feeLimit: 1_000_000_000 // Optional: max TRX to cover fees
            });

        console.log("\n✅ Lock successful!");
        console.log("📦 Tron Transaction ID:", tx);
    } catch (err) {
        console.error("\n❌ Lock failed:", err);
    }
}

lockTrx();
