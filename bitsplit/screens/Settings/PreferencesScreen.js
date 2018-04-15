import React, { Component } from 'react';
import { Item, AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard, Picker } from 'react-native';
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
                <View style={{ width: '66%' }}>
                    <Text style={{ fontSize: 17, padding: 14}}>
                        {description}
                    </Text>
                </View>
                <View style={{ width: '34%' }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={stateVariable}
                        onValueChange={(value, index) => onChanged(value)}>
                        {list.map((s, i) => { return <Picker.Item key={i} value={s} label={s} /> })}
                    </Picker>
                </View>
            </View>
        )
    }

    render() {
        var currencies = ["USD", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "DKK", "EUR", "GBP", "HKD", "INR", "ISK", "JPY", "KRW", "NZD", "PLN", "RUB", "SEK", "SGD", "THB", "TWD"],
            prefixes = ["BTC", "mBTC", "Satoshi"],
            colorSchemes = ['Green', 'Blue', 'Red', 'Black'];

        return (
            <View>
                {this.settingWithDropdown(prefixes, 'Preferred prefix:', (value) => this.setState({ preferredPrefix: value }), this.state.preferredPrefix)}
                {this.settingWithDropdown(currencies, 'Preferred currency:', (value) => this.setState({ preferredCurrency: value }), this.state.preferredCurrency)}
                {this.settingWithDropdown(colorSchemes, 'Preferred color scheme:', (value) => this.setState({ preferredColorScheme: value }), this.state.preferredColorScheme)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
})