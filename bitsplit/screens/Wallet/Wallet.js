import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar } from 'react-native';
import { RootNavigator } from '../../config/router';

export default class Wallet extends Component {

    render() {

        const { navigate } = this.props.navigation;


        return (
            <View style={styles.fullScreen}>

                <View style={styles.tabStyle}>
                    <View style={[{ height: 56, backgroundColor: '#7EC480' }]}>
                    </View>
                </View>

                <View style={styles.container}>
                    <StatusBar backgroundColor="#7EC480" barStyle="light-content" />

                    <ScrollView style={styles.settingsList}>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={styles.category}>
                                Balance
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('Send', {})}
                        >
                            <Text style={styles.category}>
                                Send
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('Receive', {})}
                        >
                            <Text style={styles.category}>
                                Receive
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        flexDirection: 'row',
    },
    tabStyle: {
        width: 20,
        backgroundColor: '#fff',
    },
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