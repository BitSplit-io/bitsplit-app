var bitsplitURL = "http://10.0.2.2:8080";

import React, { Component, Image, } from 'react';
import { Icon } from 'react-native-elements';
import { Appregistry, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/Home/Home';
import Pool from '../screens/Pool/Pool';
import EditPool from '../screens/Pool/EditPool';
import EditPoolMembers from '../screens/Pool/EditPoolMembers';
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
import AddressSettings from '../screens/Settings/AddressSettings';

export default class Start extends Component {
    render() {
        return <RootNavigator />
    }
};

// export const HomeTabs = TabNavigator({
//     Settings: {
//         screen: Settings,
//     },
//     Home: {
//         screen: Home,
//     },
// }, {
//         initialRouteName: 'Home',
//         navigationOptions: {
//             tabBarVisible: false,
//         }
//     },
// );

export const RootNavigator = StackNavigator({
    LoadingScreen: {
        screen: LoadingScreen,
        navigationOptions: { header: null, }
    },
    ConfirmPasswordScreen: {
        screen: ConfirmPasswordScreen,
        navigationOptions: { header: null, }
    },
    Login: {
        screen: Login,
        navigationOptions: { header: null, }
    },
    Home: {
        screen: Home,
        navigationOptions: { header: null, }
    },
    NewUser: {
        screen: NewUser,
        navigationOptions: { header: null, }
    },
    AddressSettings: {
        screen: AddressSettings,
        navigationOptions: { header: null, }
    },
    Pool: {
        screen: Pool,
        navigationOptions: {
            title: "Pool Details",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    EditPool: {
        screen: EditPool,
        navigationOptions: {
            title: "Edit Pool",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    EditPoolMembers: {
        screen: EditPoolMembers,
        navigationOptions: {
            title: "Edit Pool Members",
            headerTitleStyle: {
                color: "#fff",
            },
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
            title: "Account",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            },
        }
    },
    PreferencesScreen: {
        screen: PreferencesScreen,
        navigationOptions: {
            title: "Preferences",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    SecurityScreen: {
        screen: SecurityScreen,
        navigationOptions: {
            title: "Security",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    UserGuideScreen: {
        screen: UserGuideScreen,
        navigationOptions: {
            title: "User Guide",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    SupportScreen: {
        screen: SupportScreen,
        navigationOptions: {
            title: "Support",
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: {
                backgroundColor: '#7EC480',
                elevation: 5,
            }
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            title: "About",
            headerTitleStyle: {
                color: "#fff",
            },
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