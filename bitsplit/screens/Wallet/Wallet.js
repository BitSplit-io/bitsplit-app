import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class Wallet extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7EC480" barStyle="light-content" />
                
                <ScrollView style={styles.settingsList}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Balance
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Send
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Recieve
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Transactions
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Manage
                    </Text>
                    </TouchableOpacity>
                    
                </ScrollView>

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
    category: {
        fontSize: 30,
        fontWeight: '400',
        color: '#ffffff',
    },
    buttonStyle: {
        paddingVertical: 12,
        paddingLeft: 80,
    },

});