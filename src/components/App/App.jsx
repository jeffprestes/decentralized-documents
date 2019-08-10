import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
      formAddress: '0x8e287B1F206eF762D460598bdE1A9C22db6b6382',
      formIPFS: '',
      imgUrl: '',
      statusMsg: 'Waiting for submission',
    }
    this.captureFile = this.captureFile.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.handleSubmitIPFS = this.handleSubmitIPFS.bind(this);
    this.handleSubmitSC = this.handleSubmitSC.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.handleChangeIPFS = this.handleChangeIPFS.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    console.log('contract', contract);
    console.log('ipfs', ipfs);
  }

  async componentDidMount() {
    //console.log('componentDidMount/contract.signer', contract.signer.provider._web3Provider)
    try {
      const userAddress = await contract.signer.getAddress()
      console.log('componentDidMount/userAddress', userAddress)
      this.setState({
        ethAddress: userAddress,
      })
    } catch (err) {
      console.error('componentDidMount/error', err.message)
      alert('An error occurred. Could you confirm if your Metamask is open and running?')
    }
    this.setEventListeners()
  }

  setEventListeners() {
    contract.on('ipfsSent', (ipfsHash, address, event) => {
      console.log('setEventListeners/ipfsSent/event', event)
      if (address.toUpperCase() === this.state.ethAddress.toUpperCase()) {
        this.setState({
          ipfsHash: ipfsHash,
          imgUrl: `https://gateway.ipfs.io/ipfs/${ipfsHash}`,
          statusMsg: `Your received a file https://gateway.ipfs.io/ipfs/${ipfsHash}`,          
        })
      }
    })    
  }

  handleChangeAddress(evt) {
    this.setState({
      formAddress: evt.target.value,
    })
  }

  handleChangeIPFS(evt) {
    this.setState({
      formIPFS: evt.target.value,
    })
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

  async handleSubmitSC(event) {
    event.preventDefault()
    this.setState({
      statusMsg: 'Submiting IPFS Hash to the Smart Contract'
    })
    try {
      let tx = await contract.sendIPFS(this.state.formAddress, this.state.formIPFS)
      let receipt = await tx.wait(1);
      if (receipt.status === 1) {
        console.log('handleSubmitSC/sucesso/tx', tx, receipt)
        this.setState({
          statusMsg: 'IPFS file registered to ' + this.state.formAddress
        })
      } else {
        this.setState({
          statusMsg: 'Error when executing sendIPFS contract method'
        })
      }
    } catch (err) {
      console.error('handleSubmitSC ', err)
      this.setState({
        statusMsg: 'Error when executing sendIPFS contract method ' + err.message
      })
    }
  }

  async handleSubmitIPFS(event) {
    event.preventDefault()
    this.setState({
      statusMsg: 'Submiting file to IPFS network',
    })
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err.message)
        this.setState({
          buffer: '',
          statusMsg: err.message,
        })
        return
      }
      console.log('handleClick/sucesso/ipfsHash', ipfsHash)
      this.setState({
        formIPFS: ipfsHash[0].hash,
        statusMsg: 'The IPFS hash is https://gateway.ipfs.io/ipfs/' + ipfsHash[0].hash
      })      
    })
  }

  render() {
    let image = ''
    if (this.state.imgUrl.length>10) {
     image = <img alt={this.state.imgUrl} src={this.state.imgUrl} />
    }
    return (
      <Container>
        <Row>
          <Col lg="2">
            &nbsp;
          </Col>
          <Col lg="6" md="auto">
            <Container>
              <Row>
                <Col>
                  <h2>
                    1. Add a file to IPFS here
                  </h2>
                  <form id="frmFile" className="scep-form" onSubmit={this.handleSubmitIPFS}>
                    <input type="file" name="fileToSend" id="fileToSend" onChange={this.captureFile} />
                    <br />
                    <button type="submit">Send it</button>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>
                    2. Send notifications here
                  </h2>
                  <form id="frmNotifications" className="scep-form" onSubmit={this.handleSubmitSC}>
                    <div>
                      <div>
                        <label for="receiverAddress">
                          Receiver address:
                        </label>
                        <input size="50" type="text" name="receiverAddress" id="receiverAddress" value={this.state.formAddress} onChange={this.handleChangeAddress} />
                      </div>
                      <div>
                        <label for="ipfsHash">
                          IPFS hash:
                        </label>
                        <input size="128" type="text" name="ipfsHash" id="ipfsHash" value={this.state.formIPFS} onChange={this.handleChangeIPFS} />
                      </div>
                    </div>
                    <br />
                    <div>
                      <button type="submit">Register it</button>
                    </div>
                  </form>
                </Col>
              </Row>              
            </Container>
          </Col>
          <Col lg="4">
            <br />
            <hr/>
            <br/>
            <div>
              <p>
                Status: {this.state.statusMsg}
                <br />
                { image }
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
