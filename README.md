# About

Building a decentralized application requires stepping away from serving our app's code from typical web hosting services. One way to do this is by using a peer to peer distributed file system. [IPFS](https://ipfs.io/) which has a series of nodes connected to IPFS's network.

## Tech Stack:
- [Truffle](https://truffleframework.com/)
- [Infura](https://infura.io/) - [Ganache](https://truffleframework.com/ganache) (A default client for a local node for backup testing / developments.)
- [IPFS](https://ipfs.io/)
- [Solidity](https://solidity.readthedocs.io/en/develop/)
- [ReactJS](https://reactjs.org/)

## Notes:

- Keep Ganache running as part of your default (non-active) local node. Due to frameworks and dependancies that are attempting to keep up with big updates, you may have the chance to deal with something called "dependancy hell" (ground breaking changes as a result.)

> For example: The boilerplate unbox for react on the Truffle framework was not up to date. Which lead to me manually figuring out the bugs from the recent commit.

## Todo:

1. Setting up [IPFS](https://ipfs.io/) and Infura next. Then testing data from Ropsten Etherscan for our start of our smart contracts.