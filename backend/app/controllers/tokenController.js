var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("HTTPS://ropsten.infura.io/v3/eda623b4a9664c5ba54a726541372946"));
var abiArray = JSON.parse(fs.readFileSync('mycoin.json', 'utf-8'));

// exports.getBalance=(address)=>{

// }
let count;
// console.log(count)
// console.log(abiArray)
var contractAddress = "contract address here";
// var contract =new web3.eth.contract(abiArray,contractAddress);
var contract = new web3.eth.Contract(abiArray, contractAddress)

web3.eth.getTransactionCount("0x3c250227150438ed372F93Bb01C51785281d9DEF").then((_nonce) => {
    console.log(_nonce)
    var gas = 0
    var gasLim = 0
    web3.eth.getGasPrice().then((gasP) => {
        gas = gasP
        console.log("-->", gas)

    })
    web3.eth.getGasPrice().then((gasL) => {
        gasLim = gasL
        console.log("-->", gasLim)

    })
    var rawTransaction = {
        "from": new Buffer.from('user address', 'hex'),
        "nonce": _nonce,
        "gasPrice": 2000000000,
        "gasLimit": 67000,
        "to": new Buffer.from("another user address", 'hex'),
        "value": 0,
        "data": contract.methods.balanceOf("user address").encodeABI(),
        "chainId": 3
    };
    console.log("raw", rawTransaction)
    let privKey = new Buffer.from('user private key', 'hex');
    let tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log).catch(console.log);
}).catch(console.log);

exports.getBalance = async (req, res) => {

    var contract = new web3.eth.Contract(abiArray, contractAddress)
    web3.eth.getTransactionCount("user address").then((_nonce) => {
    
        var rawTransaction = {
            "from": new Buffer.from('USER ADDRESS', 'hex'),
            "nonce": _nonce,
            "gasPrice": 2000000000,
            "gasLimit": 67000,
            "to": new Buffer.from("another user ADDRESS", 'hex'),
            "value": 0,
            "data": contract.methods.balanceOf("user addess").encodeABI(),
            "chainId": 3
        };
        let privKey = new Buffer.from('private key', 'hex');
        let tx = new Tx(rawTransaction);
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log).catch(console.log);
    }).catch(console.log);

}