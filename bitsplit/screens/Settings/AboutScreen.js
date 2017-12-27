import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
export default class ReceiveScreen extends Component {

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={[{flex: 1}]}>
                        <Image
                            style={styles.logo}
                            source={require('../../src/images/Logo.png')} />
                    </View>
                    <Text style={styles.title}>
                        BitSplit
                    </Text>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 70,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#55ac45',
        paddingBottom: 20,
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: '500',
        color: '#55ac45',
    },
})