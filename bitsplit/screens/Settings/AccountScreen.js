import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { GetUserName, GetUserId } from '../../src/components/User/CurrentUser';

export default class ReceiveScreen extends Component {

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Welcome {GetUserName()}!
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Your user-ID is: {GetUserId()}
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Your administrate ?? pools.
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Total amount of BTC received from pools:
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Total amount of BTC received from pools:
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Total revenue of BTC earned by all shared pools:
                    </Text>
                </View>

                <View style={styles.infoSegment}>
                    <Text style={styles.infoFont}>
                        Explore transaction history from all pools
                    </Text>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        margin: 7,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: "#222",
        borderWidth: 1,
        maxHeight: 100,
    },
    inputLabel: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        borderColor: "#222",
        borderWidth: 1,
        height: 50,
    },
    inputField: {
        flex: 1,
        justifyContent: 'center',
        borderColor: "#222",
        borderWidth: 1,
        height: 50,
    },
    infoContainer: {
        // top: 100,
        flex: 1,
        backgroundColor: '#f5fff5',
        minHeight: 500,
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        zIndex: 100,
    },
    infoFont: {
        fontSize: 20,
        fontWeight: '100',
    },
    infoSegment: {
        flexDirection: 'row',
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#A0A0A0',
    }
})