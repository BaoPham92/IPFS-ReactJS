const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({ host: "infura.io", port: 5001, protocol: "https"})

export default ipfs