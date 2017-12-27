import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import { GetUserId } from '../../src/components/User/CurrentUser';
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent';
import { GetPool, CreateNewPool } from '../../src/api/ApiUtils';

const activePool = '';

export default class EditPool extends Component {

    constructor() {
        super();
        this.state = {
            activePool: new PoolComponent(),
            recipients: [],
            transactionFee: 0.5,
        };
        this.state.poolAdmin = GetUserId();
        console.log(this.state.activePool.poolDetails.poolAdmin);
        console.log('this.state.activePool.poolDetails.poolAdmin');
    }




    render() {

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>


                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.pieContainer}>

                        {this.state.activePool.renderPoolPieChart()}

                    </View>

                    <View style={styles.infoContainer}>

                        <View style={styles.titleSegment}>
                            <TextInput
                                style={styles.title}
                                placeholder="Enter pool name"
                                placeholderTextColor="rgba(128,128,128,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='left'
                                autoCapitalize="words"
                                autoCorrect={false}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                onChangeText={(poolName) => this.state.activePool.setPoolName(poolName)}
                            >
                            </TextInput>
                        </View>

                        <View style={styles.titleSegment}>
                            <TextInput
                                style={styles.title}
                                placeholder="Enter pool password"
                                secureTextEntry
                                placeholderTextColor="rgba(128,128,128,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='left'
                                ref={(input) => this.passwordInput = input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(poolPassword) => this.state.activePool.setPoolPassword(poolPassword)}
                            />
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Members
                            </Text>

                            <List>

                                <FlatList
                                    data={this.state.recipients}
                                    extraData={this.state}
                                    renderItem={({ item }) =>
                                        <ListItem
                                            title={item ? (item.proportion * 100) + '%' : 'asdasd'}
                                            subtitle={item ? item.address : ''}
                                            hideChevron={true}
                                        >
                                            {console.log('bahs')}
                                        </ListItem>
                                    }
                                    keyExtractor={(item, index) => item.address}
                                />
                            </List>

                            <TouchableOpacity
                                style={styles.editMembers}
                                onPress={() => navigate('EditPoolMembers', {
                                    props: this.state.activePool,
                                    onGoBack: () => { this.setState({ 
                                        recipients: this.state.activePool.poolDetails.recipients }); 
                                        console.log('back') }
                                })}
                                underlayColor='#55ac45'
                            >
                                <Text>
                                    Edit Members
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Transaction settings
                            </Text>
                        </View>

                        <Button
                        title="Submit"
                        color="#00BCFF"
                        onPress={() => CreateNewPool(
                            this.state.activePool.poolDetails.poolName, 
                            GetUserId(), 
                            this.state.activePool.poolDetails.poolPassword, 
                            this.state.recipients, 
                            this.state.transactionFee
                            )}
                        />

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
    },
    editMembers: {
        paddingTop: 7,
    }
})