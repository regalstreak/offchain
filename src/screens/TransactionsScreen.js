import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default TransactionsScreen = () => {
        return (
            <View style={styles.container}>
                <Text>
                    Hello TransactionsScreen
                </Text>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});