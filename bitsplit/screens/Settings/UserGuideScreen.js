import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { RootNavigator } from '../../config/router';
export default class ReceiveScreen extends Component {

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.fontProps}>
                    BitSplit is a service that helps you and your team to share income of cryptocurrencies to your projects in a trustful matter.
                    {"\n"}
                    {"\n"}
                    The way you use this service is to create an account in which you can moderate the members of each wallet that you want to recieve donations to.
                    {"\n"}
                    {"\n"}
                    To get started press the 'plus' icon in the top right section of the Home Screen. From here you can name your wallet, so you and your
                     members know what project this wallet belongs to. Secondly you add two or more members to the wallet, either using their public Bitcoin-address
                     or using their BitSplit-username.
                    {"\n"}
                    {"\n"}
                    The application will split the members part evenly by default. You have the ability to change each members share of the wallet to fit your projects desired outcome.
                </Text>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5fff5',
    },
    fontProps: {
        fontSize: 16,
    },
})