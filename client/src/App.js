import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from "./utils/API/ipfs.js"

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,

      // File reading.
      buffer: null,

      // ipfs.
      ipfsHash: ''
     }

     this.uploadFile = this.uploadFile.bind(this)
     this.submitFile = this.submitFile.bind(this)

  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  uploadFile(e) {
    e.preventDefault();

    // Web API using FileReader for uploading files: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(e.target.files[0])
    
    reader.onloadend = () => {
      // Node.js module "Buffer" rss: https://www.w3schools.com/nodejs/ref_buffer.asp
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  submitFile(e) {
    e.preventDefault();
    console.log("submiting file")

    // ipfs-http-client API documentation: https://github.com/ipfs/js-ipfs-http-client
    ipfs.add(this.state.buffer, (err, res) => {
      
      if (err) { console.log(err) }

      this.setState({ ipfsHash: res[0].hash })
      console.log('ipfsHash ', this.state.ipfsHash)
    })
    
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Smart Contract Image Uploader</h2>
        <p>This would be your image that is uploaded on the Ethereum blockchain.</p>
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt="" />

        <form action="" onSubmit={this.submitFile}>
          <input type="file" onChange={this.uploadFile} />
          <input type="submit" />
        </form>

      </div>
    );
  }
}

export default App;
