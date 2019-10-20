import React from 'react';
import { Text, View, StyleSheet } from 'react-native';




export const MainNavigator = () => {

    return (
        <View style={styles.container}>
            <Text>
                Hello MainNavigator
                </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});