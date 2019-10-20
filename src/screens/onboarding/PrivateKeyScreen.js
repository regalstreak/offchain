import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const PrivateKeyScreen = () => {
        return (
            <View style={styles.container}>
                <Text>
                    Hello PrivateKeyScreen
                </Text>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});