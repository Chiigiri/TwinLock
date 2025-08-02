# TwinLock 🔒🔗

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
**Bi‐directional Hashlock/Timelock Atomic Swap** between Ethereum (Sepolia) and Tron (Nile).

TwinLock enables two parties to swap assets—ERC-20 tokens on Ethereum for native TRX on Tron without intermediaries or custodians, using cryptographic hashlocks and timelocks.# TwinLock 🔒🔗

  
**Bi-directional Hashlock/Timelock Atomic Swap** between Ethereum (Sepolia) and Tron (Nile)

TwinLock is a developer-focused cross-chain swap protocol that allows two users to securely exchange assets across incompatible blockchains **Ethereum** and **Tron** using **Hashed Timelock Contracts (HTLCs)**. It enables **trustless peer-to-peer swaps** of ERC-20 tokens and native TRX **without custodians, bridges, or oracles**.

TwinLock is a minimal prototype meant to demonstrate the power of **cryptographic primitives** like hashlocks and timelocks to create atomicity across chains that don't natively communicate with each other.



## 🧠 What is TwinLock?

TwinLock is:

- A **command-line toolkit** for conducting atomic swaps
- A **smart contract pair**: one on Ethereum (Solidity) and one on Tron (Solidity-like TVM)
- A real-world **bi-directional bridge alternative**—but without relying on any third-party protocol
- Built with **developer learning and extensibility** in mind


## 📦 What Can TwinLock Do?

- Swap **ERC-20 tokens (Ethereum Sepolia)** for **TRX (Tron Nile)** directly
- Use a **single shared secret** to unlock both sides of the swap
- **Automatically refund** tokens if the swap isn't completed in time
- Avoid any **centralized relay or validator**
- Be easily **extended** to other chains with HTLC support



## 📷 How It Works

### 1. Initiator Locks Tokens (ETH Side)

Alice wants to swap her 100 USDC (ERC-20 on Ethereum) for Bob's 100 TRX (on Tron).  
She generates a **secret** and its **hash (hashlock)**, then locks her tokens in the Ethereum HTLC contract for Bob to claim.


## 📋 Table of Contents

- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Setup](#setup)  
  - [Clone & Install](#clone--install)  
  - [Environment Variables](#environment-variables)  
- [Usage](#usage)  
  - [Lock on Ethereum](#lock-on-ethereum)  
  - [Lock on Tron](#lock-on-tron)  
  - [Claim on Ethereum](#claim-on-ethereum)  
  - [Claim on Tron](#claim-on-tron)  
  - [Refund on Ethereum](#refund-on-ethereum)  
  - [Refund on Tron](#refund-on-tron)  
- [Project Structure](#project-structure)  
- [Testing](#testing)  
- [Contributing](#contributing)  
- [License](#license)  

---

## ✨ Features

- **Hashlock / Timelock** HTLC on both chains  
- **ERC-20 support** on Ethereum  
- **Native TRX support** on Tron  
- **Single shared secret** powers both locks  
- **Simple Node.js scripts**—no UI required  
- **Fast end-to-end demo** on testnets  

---

## 🛠 Prerequisites

- **Node.js** v18+ & **npm**  
- **Git** (for cloning and version control)  
- **Infura** or **Alchemy** Sepolia RPC key  
- **Tron** private key for Nile testnet  




