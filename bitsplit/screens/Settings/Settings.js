import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { Logout } from '../../src/api/ApiUtils'
import { RootNavigator } from '../../config/router';
import { CurrentUser } from '../../src/components/User/CurrentUser';
import { NavigationActions } from 'react-navigation';

export default class Settings extends Component {

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.fullScreen}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={require('../../src/images/Logo.png')} />

                        <Text style={styles.title}>
                            BitSplit
                    </Text>
                    </View>


                    <ScrollView style={styles.settingsList}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('AccountScreen', {})}
                        >
                            <Text style={styles.category}>
                                Account
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('PreferencesScreen', {})}
                        >
                            <Text style={styles.category}>
                                Preferences
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('SecurityScreen', {})}
                        >
                            <Text style={styles.category}>
                                Security
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('UserGuideScreen', {})}
                        >
                            <Text style={styles.category}>
                                User Guide
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('SupportScreen', {})}
                        >
                            <Text style={styles.category}>
                                Support
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigate('AboutScreen', {})}
                        >
                            <Text style={styles.category}>
                                About
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => {
                                Logout().then(() =>
                                    this.props.navigation.dispatch(
                                        NavigationActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })]
                                        }))
                                )
                            }}
                        >

                            <Text style={styles.category}>
                                Sign Out
                        </Text>
                        </TouchableOpacity>


                    </ScrollView>
                </View>

                <View style={styles.tabStyle}>
                
                    <View style={[{height: 56, backgroundColor: '#7EC480',}]}>
                    </View>
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
        backgroundColor: 'rgb(250,250,250)',
    },
    container: {
        flex: 1,
        backgroundColor: '#275629',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 1.0,
        shadowRadius: 1,
        shadowOffset: {width: -10, height: 0},
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        paddingBottom: 20,
    },
    logo: {
        width: 70,
        height: 70,
        marginLeft: "15%",
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

