import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, StatusBar, Text, Image, TouchableOpacity } from 'react-native';

export default class Settings extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7EC480" barStyle="light-content" />

                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../../src/images/Logo.png')} />

                    <Text style={styles.title}>
                        BitSplit
                    </Text>
                </View>


                <ScrollView style={styles.settingsList}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Account
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Preferences
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Security
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            User Guide
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Support
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            About
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.category}>
                            Sign Out
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        paddingBottom: 20,
    },
    settingsList: {
        paddingTop: 50,
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: '500',
        color: '#ffffff',
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

