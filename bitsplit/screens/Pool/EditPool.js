import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity, Modal } from 'react-native';
import { List, ListItem, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import { GetUserId } from '../../src/components/User/CurrentUser';
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent';
import { GetPool, CreateNewPool, UpdatePool } from '../../src/api/ApiUtils';
import MessageBar from '../Notification/MessageBar';
import MessageBarManager from '../Notification/MessageBarManager';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import DeletePoolModal from './DeletePoolModal';


const activePool = '';

export default class EditPool extends Component {

    constructor(props) {
        super();
        var pool = props.navigation.state.params ? props.navigation.state.params.props : null;

        this.state = {
            activePool: pool,
            recipients: [],
            transactionFee: 10,
            deleteModal: undefined,
        };
        if (!this.state.activePool) {
            this.state.activePool = new PoolComponent()
            this.state.activePool.poolDetails.poolAdmin = GetUserId();
        } else {
            this.state.deleteModal = new DeletePoolModal(this.state.activePool.poolDetails.poolId, props.navigation);
            this.state.deleteModal.setUpdateCallback(() => this.forceUpdate());
        };
    }

    renderDeleteBtn() {
        return (
            <View style={{ height: 100, justifyContent: "center" }}>

                <TouchableOpacity
                    onPress={() => {
                        this.state.deleteModal.toggleModal(true)
                        this.forceUpdate();
                    }}
                >
                    <Text style={styles.deletePoolButton}>DELETE POOL</Text>
                </TouchableOpacity>

            </View>
        )
    }

    render() {

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>
                <Modal
                    visible={this.state.deleteModal ? this.state.deleteModal.isEnabled() : false}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                    style={styles.deleteModal}
                >
                    {this.state.deleteModal.render()}
                </Modal>

                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.pieContainer}>

                        {this.state.activePool.renderPoolPieChart()}

                    </View>

                    <View style={styles.infoContainer}>


                        <View style={styles.titleSegment}>
                            <TextInput
                                style={styles.title}
                                placeholder={(this.state.activePool.poolDetails && this.state.activePool.poolDetails.poolName) ? this.state.activePool.poolDetails.poolName : "Enter pool name"}
                                placeholderTextColor="rgba(128,128,128,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='left'
                                autoCapitalize="words"
                                autoCorrect={false}
                                onSubmitEditing={() => this.state.activePool.poolDetails.intermediateAddress ? null : this.passwordInput.focus()}
                                onChangeText={(poolName) => this.state.activePool.setPoolName(poolName)}
                            >
                            </TextInput>
                        </View>

                        {this.state.activePool.poolDetails.intermediateAddress ?
                            <View></View>
                            :
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
                        }



                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Members
                            </Text>

                            <List>

                                <FlatList
                                    data={this.state.activePool.poolDetails.recipients}
                                    extraData={this.state}
                                    renderItem={({ item }) =>
                                        <ListItem
                                            title={item ? (item.proportion * 100) + '%' : 'asdasd'}
                                            subtitle={item ? item.address : ''}
                                            hideChevron={true}
                                        >
                                        </ListItem>
                                    }
                                    keyExtractor={(item, index) => item.address}
                                />
                            </List>

                            <TouchableOpacity
                                style={styles.editMembers}
                                onPress={() => navigate('EditPoolMembers', {
                                    props: this.state.activePool,
                                    onGoBack: () => {
                                        this.setState({
                                            recipients: this.state.activePool.poolDetails.recipients
                                        });
                                    }
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
                            title={!this.state.activePool.poolDetails.intermediateAddress ? "Submit" : "Save changes"}
                            color="#00BCFF"
                            onPress={() => {

                                pool = Object.assign({}, this.state.activePool.poolDetails);

                                if (this.state.activePool.poolDetails.intermediateAddress) {

                                    UpdatePool(pool)
                                        .then((response) => {
                                            if (response.status && response.status == "success") {
                                                this.props.navigation.dispatch(
                                                    NavigationActions.reset({
                                                        index: 0,
                                                        actions: [NavigationActions.navigate({ routeName: 'Home' })]
                                                    }));
                                            } else {
                                                Toast.show("Could not update pool.\n" + (response.message ? response.message : ""));
                                            }
                                        }).catch((error) => Toast.show("Something went wrong."))

                                } else {

                                    pool["poolAdmin"] = GetUserId();

                                    CreateNewPool(pool)
                                        .then((response) => {
                                            if (response.status && response.status == "success") {
                                                this.props.navigation.dispatch(
                                                    NavigationActions.reset({
                                                        index: 0,
                                                        actions: [NavigationActions.navigate({ routeName: 'Home' })]
                                                    }));
                                            } else {
                                                Toast.show("Could not create pool.\n" + (response.message ? response.message : ""));
                                            }
                                        }).catch((error) => Toast.show("Something went wrong."))
                                }

                            }}
                        />

                    </View>

                            {this.state.activePool.poolDetails.intermediateAddress ? this.renderDeleteBtn() : <View style={{margin: 70}}></View>}


                </ScrollView>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pieContainer: {
        flex: 1,
        margin: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#f5fff5',
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        elevation: 10,
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
    },
    deletePoolButton: {
        alignSelf: 'center',
        padding: 3,
        width: 200,
        borderWidth: 0.7,
        borderColor: '#ff0000',
        textAlign: 'center',
        color: '#ff0000',
        backgroundColor: "rgba(255,0,0,0.2)",
        opacity: 0.8
    },
    deleteModal: {
        height: 100,
    }
})