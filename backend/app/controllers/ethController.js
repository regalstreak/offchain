var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

//returns nonce/ current block of a address
exports.getNonce=async (req,res)=>{
	// console.log(req.body.address)
	web3.eth.getTransactionCount(req.body.address).then((nonce)=>{
		// console.log(nonce)
		let count=nonce;
		// this has to be sent via sms
		//the user will first call this function and then request for eth transfer
		return res.json({nonce});
	})

}
//this part will be done on the erc20 token
//makes a transacitio using the signed transaction
exports.makeTransaction= async (signedBuffer)=>{
	//thiss part at  backend
	web3.eth.sendSignedTransaction('0x' + signedBuffer.toString('hex'))
		.on('receipt', console.log).catch(console.log);
};

//this part will be done in erc20 
//returns wallet balance of a particular address

exports.getBalance = async (req,res)=>{
	console.log(req)
	let address=req.body.address;
	console.log(address)
	web3.eth.getBalance(address).then(console.log).catch(console.log);
}



