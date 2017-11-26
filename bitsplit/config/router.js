var bitsplitURL = "http://172.20.10.2:8080";

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
                backgroundColor: '#55ac45',
            },
            
            indicatorStyle: {
                backgroundColor: '#222222',
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
    NewUser: {
        screen: NewUser,
        navigationOptions: { header: null, },
    },
    Pool: {
        screen: Pool,
        path: 'bitsplitURL',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 0,
            }
        }
    },
});

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};