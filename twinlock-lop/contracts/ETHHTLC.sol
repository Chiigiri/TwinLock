// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint amount
    ) external returns (bool);
}

// Minimal 1inch Limit Order Protocol interface
interface ILOP {
    function fillOrder(
        bytes calldata order,
        bytes calldata signature,
        uint256 makingAmount,
        uint256 takingAmount,
        bytes calldata interactiveData
    ) external returns (uint256 actualMakingAmount, uint256 actualTakingAmount);
}

contract TwinLockSwapEth {
    struct Swap {
        address token;
        address sender;
        address receiver;
        uint256 totalAmount;
        uint256 filledAmount;
        uint256 timelock;
        bytes32 hashlock;
        bool refunded;
        bool lopMode; // true if LOP-based swap
    }

    mapping(bytes32 => Swap) public swaps;
    address public immutable LOP_ADDRESS;

    event Locked(
        bytes32 indexed id,
        address sender,
        address receiver,
        uint256 amount,
        bool lopMode
    );
    event Claimed(bytes32 indexed id, uint256 amount, bytes32 secret);
    event Refunded(bytes32 indexed id, uint256 amount);

    constructor(address _lopAddress) {
        LOP_ADDRESS = _lopAddress;
    }

    function lock(
        bytes32 id,
        address token,
        address receiver,
        uint256 amount,
        uint256 timelock,
        bytes32 hashlock,
        bool useLOP
    ) external {
        require(swaps[id].sender == address(0), "Swap already exists");

        swaps[id] = Swap({
            token: token,
            sender: msg.sender,
            receiver: receiver,
            totalAmount: amount,
            filledAmount: 0,
            timelock: timelock,
            hashlock: hashlock,
            refunded: false,
            lopMode: useLOP
        });

        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        emit Locked(id, msg.sender, receiver, amount, useLOP);
    }

    // Normal claim (manual token transfer)
    function claim(bytes32 id, bytes32 secret, uint256 claimAmount) external {
        Swap storage s = swaps[id];
        require(!s.lopMode, "Use LOP claim");
        require(s.receiver == msg.sender, "Not receiver");
        require(block.timestamp < s.timelock, "Expired");
        require(
            keccak256(abi.encodePacked(secret)) == s.hashlock,
            "Invalid secret"
        );
        require(s.filledAmount + claimAmount <= s.totalAmount, "Exceeds total");

        s.filledAmount += claimAmount;
        require(
            IERC20(s.token).transfer(s.receiver, claimAmount),
            "Transfer failed"
        );

        emit Claimed(id, claimAmount, secret);
    }

    // Claim via 1inch Limit Order Protocol
    function claimWithLOP(
        bytes32 id,
        bytes calldata order,
        bytes calldata signature,
        uint256 makingAmount,
        uint256 takingAmount,
        bytes calldata interactiveData,
        bytes32 secret
    ) external {
        Swap storage s = swaps[id];
        require(s.lopMode, "Not a LOP swap");
        require(s.receiver == msg.sender, "Not receiver");
        require(block.timestamp < s.timelock, "Expired");
        require(
            keccak256(abi.encodePacked(secret)) == s.hashlock,
            "Invalid secret"
        );
        require(
            s.filledAmount + makingAmount <= s.totalAmount,
            "Exceeds total"
        );

        s.filledAmount += makingAmount;

        // Approve LOP to spend this contract's token
        require(
            IERC20(s.token).transfer(msg.sender, makingAmount),
            "Token transfer failed"
        );
        IERC20(s.token).transferFrom(msg.sender, address(this), makingAmount); // LOP expects it to be from taker

        // Call 1inch fillOrder()
        ILOP(LOP_ADDRESS).fillOrder(
            order,
            signature,
            makingAmount,
            takingAmount,
            interactiveData
        );

        emit Claimed(id, makingAmount, secret);
    }

    function autoRefund(bytes32 id) external {
        Swap storage s = swaps[id];
        require(!s.refunded, "Already refunded");
        require(block.timestamp >= s.timelock, "Timelock not passed");

        uint256 remaining = s.totalAmount - s.filledAmount;
        require(remaining > 0, "Nothing to refund");

        s.refunded = true;
        require(IERC20(s.token).transfer(s.sender, remaining), "Refund failed");

        emit Refunded(id, remaining);
    }
}
