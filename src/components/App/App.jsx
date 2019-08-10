import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import contract from '../../services/contract';
import ipfs from '../../services/ipfs';

//Tutorials: https://itnext.io/build-a-simple-ethereum-interplanetary-file-system-ipfs-react-js-dapp-23ff4914ce4e
// https://medium.com/@alexma6614/ethereum-ipfs-react-dapp-tutorial-pt-3-dc091408db64
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ipfsHash: null,
      buffer: '',
      ethAddress: '',
      blockNumber: '',
      transactionHash: '',
      gasUsed: '',
      txReceipt: '',
    }
    this.captureFile = this.captureFile.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    console.log('contract', contract);
    console.log('ipfs', ipfs);
  }

  captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  }

  async convertToBuffer(reader) {
    const buffer = await Buffer.from(reader.result)
    this.setState({
      buffer: buffer,
    })
  }

  async handleClick() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
