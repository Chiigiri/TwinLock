const { ethers } = require("hardhat");

async function main() {
    const tokenAddress = "0xB4DC9E1A5F8a115D1C73A6667d87FA13d68409f4";
    const twinLockAddress = "0xB45c9C4109eCd19730Bc8C445B1048aea72C2383"; // Replace this

    const [signer] = await ethers.getSigners();

    const token = await ethers.getContractAt(
        "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
        tokenAddress,
        signer
    );

    const amount = ethers.parseUnits("1000", 18); // Adjust to match your token decimals

    const tx = await token.approve(twinLockAddress, amount);
    await tx.wait();

    console.log(`✅ Approved ${amount} tokens for TwinLock at ${twinLockAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
