import React, { Component } from 'react';
import { Item, AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard, Picker } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';


export default class ReceiveScreen extends Component {

    constructor() {
        super();
        this.state = {
            preferredPrefix: 'BTC',
            preferredCurrency: 'USD',
            preferredColorScheme: 'green',
        }
    }

    settingWithDropdown(list, description, onChanged, stateVariable) {
        return (
            <View style={styles.container}>
                <View style={{ width: '66%', height: 40 }}>
                    <Text style={{ fontSize: 17, paddingTop: 14, paddingLeft: 10 }}>
                        {description}
                    </Text>
                </View>
                <View style={{ width: '34%', height: 40 }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={stateVariable}
                        onValueChange={(value, index) => onChanged(value)}>
                        {Object.keys(list).map((key) => {
                            return (<Item label={list[key]} value={key} key={key} />)
                        })}
                    </Picker>
                </View>
            </View>
        )
    }

    render() {
        var currencies = { USD: "USD" , AUD:"AUD", BRL: "BRL", CAD: "CAD", CHF: "CHF", CLP: "CLP", CNY: "CNY", DKK: "DKK", EUR: "EUR", GBP: "GBP", HKD:"HKD",
         INR: "INR", ISK: "ISK", JPY: "JPY", KRW: "KRW", NZD: "NZD",PLN: "PLN", RUB:  "RUB", SEK: "SEK", SGD: "SGD", THB: "THB", TWD:"TWD" },
         prefixes = {"BTC" : "BTC", "mBTC": "mBTC", "satoshi": "satoshi"},
         colorSchemes = { green: 'green', blue: 'blue', red: 'red', black: 'black'};
        return (
            <View>
                {this.settingWithDropdown(prefixes, 'Preferred prefix:', (value)  =>  this.setState({preferredPrefix: value}), this.state.preferredPrefix)}
                {this.settingWithDropdown(currencies, 'Preferred exchange currency:',  (value)  =>  this.setState({preferredCurrency: value}), this.state.preferredCurrency)}
                {this.settingWithDropdown(colorSchemes, 'Preferred color scheme:', (value)  =>  this.setState({preferredColorScheme: value}), this.state.preferredColorScheme)}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f5fff5',
        borderBottomWidth: 1,
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
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '100',
        paddingLeft: 24,
    },
    titleSegment: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    },
    infoSegment: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#55ac45',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    }
})