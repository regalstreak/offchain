import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={{ margin: 16 }}>
      <Text style={{ fontSize: 36, fontWeight: '700', marginVertical: 16, }}>Offchain</Text>

      <View style={{ borderWidth: 1, marginVertical: 16, borderRadius: 8, paddingHorizontal: 4 }}>
        <TextInput
          placeholder='Enter ethereum address here'
        />
      </View>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: '#AAAAAA', marginVertical: 16, borderRadius: 8 }}
        onPress={() => { console.log('test') }}>
        <Text >Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
