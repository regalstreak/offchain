import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default SettingsScreen = () => {
        return (
            <View style={styles.container}>
                <Text>
                    Hello SettingsScreen
                </Text>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});