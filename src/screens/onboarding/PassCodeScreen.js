import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export const PassCodeScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                Hello PassCodeScreen
            </Text>
            <Button
                title='Main Navigator'
                onPress={() => {
                    props.navigation.navigate('MainTabNavigator')
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});