import web3 from './web3';

const contractAddress = '0x3E4Bafa2Ca6eEcbaBF2e78Cb57AD3eB66945B0F0';

const contractAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined,
        payable: undefined,
        signature: 'constructor'
    },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        constant: undefined,
        payable: true,
        signature: '0xe97dcb62'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x8b5b9ccc'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x481c6a75'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        constant: undefined,
        payable: undefined,
        signature: '0x5d495aea'
    }
];

export default new web3.eth.Contract(contractAbi, contractAddress)