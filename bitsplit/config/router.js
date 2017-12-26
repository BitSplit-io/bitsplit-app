var bitsplitURL = "http://172.20.10.2:8080";

import React, { Component, Image, } from 'react';
import { Icon } from 'react-native-elements';
import { Appregistry, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/Home/Home';
import Pool from '../screens/Pool/Pool';
import EditPool from '../screens/Pool/EditPool';
import EditPoolMembers from '../screens/Pool/EditPoolMembers';
import Wallet from '../screens/Wallet/Wallet';
import Receive from '../screens/Transactions/Receive';
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
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    name={focused ? 'gear' : 'gear'}
                    type='evilicon'
                    size={26}
                    style={{ color: focused ? '#f5fff5' : '#f5fff5' }}
                />
            )
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    name={focused ? 'home' : 'home'}
                    type='MaterialcommunityIcons'
                    size={26}
                    style={{ color: focused ? '#f5fff5' : '#f5fff5' }}
                />
            )
        },
    },
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    name={focused ? 'wallet' : 'wallet'}
                    type='entypo'
                    size={26}
                    style={{ color: focused ? '#f5fff5' : '#f5fff5' }}
                />
            )
        },
    },
}, {
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                backgroundColor: '#55ac45',
            },
            showLabel: false,
            showIcon: true,
            indicatorStyle: {
                backgroundColor: '#f5fff5',
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
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 0,
            }
        }
    },
    EditPool: {
        screen: EditPool,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 0,
            }
        }
    },
    EditPoolMembers: {
        screen: EditPoolMembers,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 0,
            }
        }
    },

    Receive: {
        screen: Receive,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 0,
            }
        }
    }
});

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};