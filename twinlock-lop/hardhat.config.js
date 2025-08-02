require("dotenv").config();

console.log("→ SEP_URL:", process.env.SEPOLIA_RPC_URL);
console.log("→ PK:", process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.slice(0, 6) + "…");

module.exports = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY].filter(Boolean),
    },
  },
};
