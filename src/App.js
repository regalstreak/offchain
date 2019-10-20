/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SendSMS from 'react-native-sms-x';
import Web3 from 'web3';
var Tx = require('ethereumjs-tx').Transaction;

web3 = new Web3(new Web3.providers.HttpProvider("http://172."));

const App = () => {
  const [ethAddress, setEthAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const sendSms = () => {
    web3.eth.getTransactionCount('0xD9fd232c6F93a541323dF7Af4DdF724149250F0E').then((nonce) => {
      let tx = new Tx({
        "from": new Buffer.from('D9fd232c6F93a541323dF7Af4DdF724149250F0E','hex'),
        "nonce": nonce,
        // "gasPrice": 1,
        "gas": 200000,
        "to": new Buffer.from('D8D9aC19332280aFEC4aEE1bf80DD3bef8B1fA51','hex'),
        "value": '10000000',
        "chainId": 5777
      });
      tx.sign(new Buffer.from('5e986b997b7df921c89bfd74ab1ad2157a76ebf6d84a451c056dbb710eb4bafa', 'hex'));
    
      var serializedTx = tx.serialize();
      // this has to be sent not the string converted part
      // console.log(serializedTx.length);
    });
    SendSMS.send(
      123,
      '9920765114',
      'Hey.., this is me!\nGood to see you. Have a nice day.',
      (msg) => {
        console.log(msg);
      });
  };
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginVertical: 16 }}>Offchain</Text>

      <View style={{ borderWidth: 1, marginVertical: 16, borderRadius: 8, paddingHorizontal: 4 }}>
        <TextInput
          placeholder="Enter ethereum address here"
          onChange={address => {
            setEthAddress(address);
          }}
        />
      </View>

      <View style={{ borderWidth: 1, marginVertical: 16, borderRadius: 8, paddingHorizontal: 4 }}>
        <TextInput
          placeholder="Enter amount to be sent"
          onChange={amt => {
            setAmount(amt);
          }}
        />
      </View>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: '#AAAAAA', marginVertical: 16, borderRadius: 8 }}
        onPress={() => { sendSms(); }}>
        <Text >Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
