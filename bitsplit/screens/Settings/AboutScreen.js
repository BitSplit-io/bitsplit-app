import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
export default class ReceiveScreen extends Component {

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.title}>

                        <Image
                            style={styles.logo}
                            source={require('../../src/images/Logo.png')}
                        />

                        <Text style={styles.brand}>
                            BitSplit
                        </Text>

                    </View>
                </View>

                <Text>
                    BitSplit started in the year of 2017. We make it easy for you to receive Bitcoins to your team.
                    Keep them safe.
                </Text>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 70,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#55ac45',
        paddingBottom: 20,
    },
    title: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 0,
    },
    brand: {
        fontSize: 40,
        fontWeight: '500',
        textAlign: 'left',
        color: '#55ac45',
    },
})