import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, StyleSheet, Text, View, Button, Image, StatusBar } from 'react-native';

export default class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7EC480" barStyle="light-content" />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7EC480',
        padding: 20,
    },

});
