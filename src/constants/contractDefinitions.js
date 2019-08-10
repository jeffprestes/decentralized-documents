const contractDefinitions = {
  address: '0x0be1fac9f474c185c7138f983ac55d9c41635351',
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