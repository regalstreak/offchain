import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                HomeScreen
            </Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Details') }}>
                <View>
                    <Text>Details</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})


// <Onboarding
//   onDone={() => console.log('done')}
//   pages={[
//     {
//       backgroundColor: '#fff',
//       image: <Image source={require('./images/circle.png')} />,
//       title: 'Onboarding',
//       subtitle: 'Done with React Native Onboarding Swiper',
//     },
//     {
//       backgroundColor: '#fe6e58',
//       image: <Image source={require('./images/circle.png')} />,
//       title: 'The Title',
//       subtitle: 'This is the subtitle that sumplements the title.',
//     },
//     {
//       backgroundColor: '#999',
//       image: <Image source={require('./images/circle.png')} />,
//       title: 'Triangle',
//       subtitle: "Beautiful, isn't it?",
//     },
//   ]}
// />