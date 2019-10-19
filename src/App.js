/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SendSMS from 'react-native-sms-x';

const App = () => {
  const [ethAddress, setEthAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const sendSms = () => {
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
