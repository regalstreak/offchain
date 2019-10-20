/* eslint-disable no-undef */
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms-x';
var Tx = require('ethereumjs-tx').Transaction;

const filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  // the next 4 filters should NOT be used together, they are OR-ed so pick one
  read: 0, // 0 for unread SMS, 1 for SMS already read
  indexFrom: 0, // start from index 0
  maxCount: 10, // count of SMS to return each time
};

export default () => {
  const [ethAddress, setEthAddress] = useState(
    '3c250227150438ed372F93Bb01C51785281d9DEF',
  );
  const [amount, setAmount] = useState(null);
  const sendSms = async () => {
    await SendSMS.send(
      Math.floor(Math.random() * 1000),
      '9920432794',
      'add ' + address,
      msg => {
        console.log(msg);
      },
    );
    let nounce;
    setTimeout(async () => {
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          var arr = JSON.parse(smsList);
          nounce = arr[0].body;
        },
      );
      let tx = new Tx({
        from: new Buffer.from(
          '3c250227150438ed372F93Bb01C51785281d9DEF',
          'hex',
        ),
        nounce,
        // "gasPrice": 1,
        gas: 200000,
        to: new Buffer.from('780b7F58b201ac352fBD22654d04D82926386aF8', 'hex'),
        value: '10000000',
        chainId: 5777,
      });
      tx.sign(
        new Buffer.from(
          '2562fe54387b29ad63201f64f64c54647a58534b8b65d45e33efc057581bec64',
          'hex',
        ),
      );

      var serializedTx = tx.serialize();

      for (let i = 0; i < 3; i++) {
        let data =
          i +
          1 +
          '/3 ' +
          JSON.stringify(serializedTx).substring(135 * i, 135 * (i + 1));
        await SendSMS.send(
          Math.floor(Math.random() * 1000),
          '9920432794',
          data.substring(0, 139),
          msg => {
            console.log(msg);
          },
        );
        console.log(data);
      }
    }, 3000);
  };
  return (
    <View style={{margin: 16}}>
      <Text style={{fontSize: 36, fontWeight: '700', marginVertical: 16}}>
        Offchain
      </Text>

      <View
        style={{
          borderWidth: 1,
          marginVertical: 16,
          borderRadius: 8,
          paddingHorizontal: 4,
        }}>
        <TextInput
          placeholder="Enter ethereum address here"
          onChange={address => {
            setEthAddress(address);
          }}
        />
      </View>

      <View
        style={{
          borderWidth: 1,
          marginVertical: 16,
          borderRadius: 8,
          paddingHorizontal: 4,
        }}>
        <TextInput
          placeholder="Enter amount to be sent"
          onChange={amt => {
            setAmount(amt);
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: '#AAAAAA',
          marginVertical: 16,
          borderRadius: 8,
        }}
        onPress={() => {
          sendSms();
        }}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
