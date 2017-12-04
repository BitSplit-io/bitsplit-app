import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { StackNavigator } from 'react-navigation';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent'
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent'
import { GetPool } from '../../src/api/ApiUtils';

const activePool = '';

export default class Pool extends Component {


    constructor(props) {
        super(props);
        this.state = { activePool: this.props.navigation.state.params.item };
    }

    render() {


        return (

            <View style={styles.container}>


                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.pieContainer}>

                        {this.state.activePool.renderPoolPieChart()}

                    </View>

                    <View style={styles.infoContainer}>

                        <View style={styles.titleSegment}>
                            <Text style={styles.title}>
                                {this.state.activePool ? this.state.activePool.poolDetails.poolName : ''}
                            </Text>
                            <Text style={styles.subtitle}>
                                {this.state.activePool ? this.state.activePool.poolDetails.poolId : ''}
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Members
                            </Text>

                            <List>
                                <FlatList
                                    data={this.state.activePool.poolDetails.recipients}
                                    renderItem={({ item }) =>
                                        <ListItem
                                            title={item ? (item.proportion * 100)+'%' : ''}
                                            subtitle={item ? item.address : ''}
                                            hideChevron={true}
                                        />
                                    }
                                    keyExtractor={item => item.address}
                                />
                            </List>
                        </View>


                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Revenue
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Transaction settings
                            </Text>
                        </View>


                    </View>
                </ScrollView>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5',
    },
    pieContainer: {
        flex: 1,
        margin: 70,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10,
        // position: 'absolute',
    },
    infoContainer: {
        // top: 100,
        flex: 1,
        backgroundColor: '#f5fff5',
        minHeight: 500,
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        zIndex: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '100',
        paddingLeft: 24,
    },
    titleSegment: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    },
    infoSegment: {
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    }
})