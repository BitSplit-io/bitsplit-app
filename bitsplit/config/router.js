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
import Send from '../screens/Transactions/Send';
import Receive from '../screens/Transactions/Receive';
import Login from '../screens/Login/Login';
import NewUser from '../screens/NewUser/NewUser';
import Settings from '../screens/Settings/Settings';
import AccountScreen from '../screens/Settings/AccountScreen';
import PreferencesScreen from '../screens/Settings/PreferencesScreen';
import SecurityScreen from '../screens/Settings/SecurityScreen';
import UserGuideScreen from '../screens/Settings/UserGuideScreen';
import SupportScreen from '../screens/Settings/SupportScreen';
import AboutScreen from '../screens/Settings/AboutScreen';
import LoadingScreen from '../screens/App/LoadingScreen';
import ConfirmPasswordScreen from '../screens/Login/ConfirmPasswordScreen'

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
                    name={focused ? 'settings' : 'settings'}
                    type='MaterialcommunityIcons'
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
                backgroundColor: '#275629',
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
    LoadingScreen: {
        screen: LoadingScreen,
        navigationOptions: {header: null, }
    },
    ConfirmPasswordScreen: {
        screen: ConfirmPasswordScreen,
        navigationOptions: {header: null, }
    },
    Login: {
        screen: Login,
        navigationOptions: { header: null, }
    },
    Home: {
        screen: HomeTabs,
        navigationOptions: { header: null, }
    },
    NewUser: {
        screen: NewUser,
        navigationOptions: { header: null, }
    },
    Pool: {
        screen: Pool,
        navigationOptions: {
                headerStyle: {
                    backgroundColor: '#7EC480',
                    elevation: 5,
                }
                //header: 
                //right   : <Icon                     
                //name={'settings'}
                //type='MaterialcommunityIcons'
                //size={26}
                //style={'#f5fff5'} />  
        }
    },
    EditPool: {
        screen: EditPool,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
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
                elevation: 5,
            }
        }
    },
    Send: {
        screen: Send,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    AccountScreen: {
        screen: AccountScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
    PreferencesScreen: {
        screen: PreferencesScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
    SecurityScreen: {
        screen: SecurityScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
    UserGuideScreen: {
        screen: UserGuideScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
    SupportScreen: {
        screen: SupportScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,                
            }
        }
    },
});

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};