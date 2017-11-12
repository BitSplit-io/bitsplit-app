import React, { Component } from 'react';
import { Appregistry, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/Home/Home';
import Pool from '../screens/Pool/Pool';
import Wallet from '../screens/Wallet/Wallet';
import Test from '../screens/Test/Test';
import Login from '../screens/Login/Login';
import NewUser from '../screens/NewUser/NewUser';
import Settings from '../screens/Settings/Settings';

export default class Start extends Component {
    render() {
        return <RootNavigator />
    }

};

export const HomeTabs = TabNavigator({
    Settings: {
        screen: Settings,
    },
    Home: {
        screen: Home,
    },
    Wallet: {
        screen: Wallet,
    },
}, {
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                backgroundColor: '#003300',
            },
        },
    },
);

export const RootNavigator = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: { header: null, },
    },
    Home: {
        screen: HomeTabs,
        navigationOptions: { header: null, },
    },
    Pool: {
        screen: Pool,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f5fff5',
                elevation: 0,
            }
        }
    },
});

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};