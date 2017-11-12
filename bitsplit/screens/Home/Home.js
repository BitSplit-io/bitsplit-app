import React, { Component } from 'react';
import { StyleSheet, View, ListView, Text, StatusBar, TouchableOpacity, Button, } from 'react-native';
import { HomeTabs } from '../../config/router';
import { RootNavigator } from '../../config/router';
import HomeHeader from './components/HomeHeader'

import PoolList from './components/PoolList'
import SectionHeader from './components/SectionHeader'

import data from '../Test/data'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    poolName: 'Jacob Westberg',
                    poolID: '7777777',
                    poolAdmin: true,
                },
                {
                    poolName: 'Jones Dow',
                    poolID: '888888',
                    poolAdmin: false,
                },
            ]),
        };
    }

    _renderPoolList(poolData) {

        return (
            <View style={{ borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', height: 70 }}>

                <TouchableOpacity

                    onPress={() => navigate('Pool', {})}

                >
                    <Text>{poolData.poolName}</Text>
                    <Text>{poolData.poolID}</Text>
                    {poolData.poolAdmin && <Text>Admin</Text>}

                </TouchableOpacity>

            </View>
        );
    }

    render() {

        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <Button
                        onPress={() => ('Refresh')}
                        title='Refresh'
                    />

                    <Text style={styles.title}>Pools</Text>

                    <Button
                        onPress={() => navigate('Pool')}
                        title='New'
                    />
                </View>
                

                <ListView
                    renderRow={this._renderPoolList}
                    dataSource={this.state.dataSource}
                />

            </View>
        );
    }

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
      title: {
        flex: 1,
        color: '#f5fff5',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
});