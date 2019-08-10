const contractDefinitions = {
  address: '0x9fc1be96d5c0299ba96ba12576c84f8cecf61477',
  abi: [
    {
      "constant": false,
      "inputs": [],
      "name": "checkInbox",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "ipfsSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "response",
          "type": "string"
        }
      ],
      "name": "inboxResponse",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        },
        {
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "sendIPFS",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]
};

export default contractDefinitions;