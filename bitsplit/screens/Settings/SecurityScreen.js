import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
export default class ReceiveScreen extends Component {

    render() {
        return (

            <View style={styles.container}>

                <TouchableOpacity style={styles.infoSegment}>
                    <Text style={styles.fontProps}>
                        Change password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoSegment}>
                    <Text style={styles.fontProps}>
                        Request new wallet
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoSegment}>
                    <Text style={styles.fontProps}>
                        Backup personal wallet
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoSegment}>
                    <Text style={styles.fontProps}>
                        Backup wallet
                    </Text>
                </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "10%",
        backgroundColor: '#f5fff5',
    },
    infoSegment: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 0.5,
        borderColor: '#A0A0A0',
    },
    fontProps: {
        textAlign: "center",
        fontSize: 20,
    },
})