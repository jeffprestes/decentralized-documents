import { ethers } from 'ethers';
import Web3 from 'web3';

import contractDefinitions from '../constants/contractDefinitions';

let contract = null;

if (window.web3) {
  const web3 = new Web3(window.web3.currentProvider);
  try {
      // Solicita acesso a carteira Ethereum se necessário
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const tmpContract = new ethers.Contract(contractDefinitions.address, contractDefinitions.abi, provider);
      contract = tmpContract.connect(provider.getSigner());
  } catch (err) { // Usuário ainda não deu permissão para acessar a carteira Ethereum    
      console.log("error connecting to Ethereum via Metamask or other wallet"); 
      console.error(err);           
  }
}

export default contract;