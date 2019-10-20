var api = require('etherscan-api').init(process.env.ETHERSCANAPI);
var balance = api.account.balance('address here');
balance.then(function(balanceData){
  console.log(balanceData);
});