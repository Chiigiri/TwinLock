const { ethers } = require("hardhat");

async function main() {

  const arbitraryStaticCallAddress = "0x021dBD67CCCD995fF28f29Fa7c24FC6DfD10720B";

  const LimitOrderProtocol = await ethers.getContractFactory("LimitOrderProtocol");
  const lop = await LimitOrderProtocol.deploy(arbitraryStaticCallAddress);
  await lop.waitForDeployment();

  console.log("✅ LimitOrderProtocol deployed to:", lop.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
