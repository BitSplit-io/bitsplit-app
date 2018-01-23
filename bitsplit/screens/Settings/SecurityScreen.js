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
        backgroundColor: '#f5fff5',
    },
    infoSegment: {
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    },
    fontProps: {
        fontSize: 17,
    },
})