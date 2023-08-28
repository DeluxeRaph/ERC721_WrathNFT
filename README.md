# WrathNFT Smart Contract

## Introduction
"WraithNFT", is an ERC721 smart contract for minting and burning Non-Fungible Tokens (NFTs) on the Ethereum blockchain. It has a capped supply, defined minting price, and a burn function that allows users to burn their NFTs.

## Testing
The smart contract is tested using Hardhat, a development environment to compile, deploy, test, and debug your Ethereum software. The tests are written in Solidity and JavaScript. The tests are located in the `test` directory. The tests can be run using the following command:

```shell
npx hardhat test test/wraithnft.js
```

## Dependencies
The smart contract uses the following dependencies:
- OppenZeppelin's ERC721 smart contract

## Future Work
- Allow users to burn their NFTs and receive some economic incentive
