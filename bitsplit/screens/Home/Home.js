import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, Text, StatusBar, TouchableOpacity, Alert, RefreshControl, } from 'react-native';
import { List, ListItem, Icon, Button, } from "react-native-elements";
import { HomeTabs, RootNavigator } from '../../config/router';
import HomeHeader from './components/HomeHeader'
import { getPools, setPools, } from '../../src/components/User/CurrentUser';

import { GetUserPools } from '../../src/api/ApiUtils';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import SectionHeader from './components/SectionHeader'

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

        this.refreshPools();

    };

    refreshPools() {
        console.log("REFRESHING POOLS")
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
        this.setState({ refreshing: true });
        this.refreshPools();
    }

    render() {

        super.render;

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <Button
                        onPress={() => this.refreshPools()}
                        icon={{ name: 'refresh' }}
                        backgroundColor={'rgba(0,0,0,0)'}
                        style={styles.headerIcon}
                    />

                    <Text style={styles.title}>Pools</Text>

                    <Button
                        onPress={() => navigate('EditPool', { props: new PoolComponent() })}
                        icon={{ name: 'plus', type: 'foundation' }}
                        backgroundColor={'rgba(0,0,0,0)'}
                    />

                </View>

                <FlatList
                    data={this.state.poolComponents}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigate('Pool', { item })} underlayColor='#55ac45'>
                            <ListItem
                                roundAvatar
                                title={item ? item.poolDetails.poolName : ''}
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

            </View>

        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5'
    },
    text: {
        fontSize: 16,
    },
    header: {
        height: 56,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7EC480',
    },
    headerIcon: {
        flex: 1,
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
});