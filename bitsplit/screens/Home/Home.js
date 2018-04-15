import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, Text, StatusBar, TouchableOpacity, Alert, RefreshControl, Image, TouchableHighlight, } from 'react-native';
import { List, ListItem, Icon, Button, } from "react-native-elements";
import { HomeTabs, RootNavigator } from '../../config/router';
import HomeHeader from './components/HomeHeader'
import { getPools, setPools, } from '../../src/components/User/CurrentUser';
import { GetUserPools } from '../../src/api/ApiUtils';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import SectionHeader from './components/SectionHeader'
import Swipeout from "react-native-swipeout";
import Modal from "react-native-modal";
import Settings from '../Settings/Settings';
// const ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2,
// });

export default class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            poolComponents: [],
            error: null,
            refreshing: false,
        }
    };

    componentWillMount() {
        this.refreshPools();
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

    renderFlatlist(navigate) {
        return (
            <View style={{flex: +!!this.state.poolComponents.length}}>
            <FlatList
                data={this.state.poolComponents}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigate('Pool', { item })} underlayColor='#fff'>
                        <ListItem
                            roundAvatar
                            title={item ? item.poolDetails.poolName + " (balance: " + item.poolDetails.balance + ")" : ''}
                            subtitle={item ? item.poolDetails.intermediateAddress : ''}
                        /* avatar={{ uri: item.picture.thumbnail }} */
                        />
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

    renderInfoField() {
        if (!this.state.loading && !this.state.refreshing) {

            if (!this.state.poolComponents.length) {

                return (
                    <View style={styles.emptyPoolField}>
                        <Text style={{ alignSelf: "center", fontSize: 26, paddingTop: 40 }}>
                            Welcome!
                    </Text>
                        <Text style={{  textAlign: "center", fontSize: 20, paddingTop: 40 }}>
                            You don't have any pools registered yet.
                            To create a new pool, use the plus sign in the top right corner.
                    </Text>
                    </View>
                )

            }

        }
    }

    render() {

        super.render;

        const navigate = this.props.navigation.navigate;
        const resizeMode = 'center';

        return (

            <View style={styles.container}>
            <StatusBar backgroundColor="#275629"/>

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
                        onPress={() => navigate('Settings')}
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
                        onPress={() => navigate('EditPool', { props: new PoolComponent() })}
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

            </View>

        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        borderBottomWidth: 1,
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