import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, Text, StatusBar, TouchableOpacity, AsyncStorage, Animated, Alert, RefreshControl, Image, TouchableHighlight, Menu, ScrollView } from 'react-native';
import { List, ListItem, Icon, Button, } from "react-native-elements";
import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../config/router';
import HomeHeader from './components/HomeHeader'
import { getPools, setPools, } from '../../src/components/User/CurrentUser';
import { GetUserPools, RegisterFirebaseDeviceToken } from '../../src/api/ApiUtils';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import SectionHeader from './components/SectionHeader'
import Swipeout from "react-native-swipeout";
import Modal from "react-native-modal";
import Settings from '../Settings/Settings';
import ScreenComponent from '../ScreenComponent';
import SideMenu from "react-native-side-menu";

export default class Home extends ScreenComponent {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            loading: false,
            poolComponents: [],
            error: null,
            refreshing: false,
            // animationBackground: new Animated.Value(),
            // animationStarted: false,
        }
        // this.state.animationBackground.setValue(0.0);
    }

    componentWillMount() {
        this.refreshPools();
        AsyncStorage.getItem("@DeviceStore:firebaseIdToken").then((token) => {
            console.log(token);
            RegisterFirebaseDeviceToken(token);
        })
    }

    refreshPools() {
        if (this.state.refreshing) return;
        console.log("REFRESHING POOLS")
        this.setState({ refreshing: true });
        this.setState({
            poolComponents: []
        })
        GetUserPools().then(results => {
            var _poolComponents = [];
            console.log("results.data.length: " + results.data.length);
            for (var i = 0; i < results.data.length; i++) {
                _poolComponents.push(new PoolComponent(results.data[i]));
            }
            this.setState({
                poolComponents: _poolComponents,
            })
            this.setState({ refreshing: false });
            console.log("AT THIS POINT RESULT DATA IS: ")
            console.log(this.state.poolComponents);
        });
    }

    _onRefresh() {
        this.refreshPools();
    }

    // // TODO:
    // // Animation to indicate pools that has a positive balance.
    // // This is being called from the Flatlist component of pools and
    // // returns an static RGBA-string, if the item is empty, or otherwise an animated RGBA-string otherwise.
    // -------------------------------------------------------------------------------------------------------
    // animationListObj() {

    //     // Starts animation once
    //     if (!this.state.animationStarted) {
    //         this.setState({ animationStarted: true });

    //         Animated.timing(this.state.animationBackground,
    //             {
    //                 duration: 5000,
    //                 toValue: 1.0
    //             }
    //         ).start();
    //     }
    // }


    // RENDER of every list object.
    // Returns a link to every pool that the user is registered to.
    // -------------------------------------------------------------------------------------------------------
    renderFlatlist(navigate) {
        return (
            <View style={{ flex: +!!this.state.poolComponents.length }}>
                <FlatList
                    data={this.state.poolComponents}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigate('Pool', { item, onGoBack: () => { this.refreshPools(); return this } }
                        )}>

                            {/* Starting an animation loop of the background color if a  */}
                            {/* {(item.poolDetails.balance > 0 ? this.animationListObj() : null)} */}

                            {/* Checking if this specific item represents a pool with a positive balance, thus animating it's background */}
                            <Animated.View style={{ backgroundColor: "rgba(0, 188, 255, " + (item.poolDetails.balance > 0 ? 0.2 : 0) + ")" }}>
                                <ListItem
                                    title={item ? item.poolDetails.poolName : ''}
                                    subtitle={item ? " Balance: " + item.poolDetails.balance : ''}
                                    avatar={item.renderPoolPieChart(22)}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    keyExtractor={item => item.poolDetails.poolId}
                />
                <View>
                    {this.renderInfoField()}
                </View>
            </View>

        )
    }

    // RENDER of a welcome message.
    // Gives information to first time users and users that are not registered in any pool
    // -------------------------------------------------------------------------------------------------------
    renderInfoField() {
        if (!this.state.loading && !this.state.refreshing) {

            if (!this.state.poolComponents.length) {
                return (
                    <View style={styles.emptyPoolField}>
                        <Text style={{ alignSelf: "center", fontSize: 26, paddingTop: 40 }}>
                            Welcome!
                        </Text>
                        <Text style={{ textAlign: "center", fontSize: 20, paddingTop: 40 }}>
                            You don't have any pools registered yet.
                            To create a new pool, use the plus sign in the top right corner.
                        </Text>
                    </View>
                )
            }
        }
    }

    // Toggles the sidemenu
    // -------------------------------------------------------------------------------------------------------
    toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const navigate = this.props.navigation.navigate;
        var menu = <Settings {...this.props} />;
        const resizeMode = 'center';

        return (
            <SideMenu
                menu={menu}
                bounceBackOnOverdraw={false}
                edgeHitWidth={250}
                openMenuOffset={300}
                isOpen={this.state.isOpen}
                onChange={(status) => this.setState({ isOpen: status })}
            >

                <View style={styles.container}>
                    <StatusBar backgroundColor="#275629" />
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                            position: "absolute",
                        }}
                        source={require('../../src/images/Logo_transparent.png')}
                    />

                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { this.toggleMenu() }}
                            style={styles.headerIcon}
                        >
                            <Icon
                                name='settings'
                                type="MaterialCommunityIcons"
                                color="#3b7830"
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>Pools</Text>

                        <TouchableOpacity
                            onPress={() => navigate('EditPool', { activePool: new PoolComponent(), onGoBack: () => { this.refreshPools; return this } })}
                            style={styles.headerIcon}
                        >
                            <Icon
                                name='plus'
                                type='foundation'
                                color="#3b7830"
                            />
                        </TouchableOpacity>
                    </View>
                    {this.renderFlatlist(navigate)}
                    {this.MessageBarContainer()}
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#7EC480',
    },
    headerIcon: {
        flex: 1,
        height: 56,
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        color: '#f5fff5',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    poolSegment: {
        flex: 1,
        borderBottomWidth: 0.3,
        borderBottomColor: '#A0A0A0',
        height: 70,
    },
    poolButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyPoolField: {
        padding: 5,
        alignContent: "center",
        elevation: -10,
    },
});