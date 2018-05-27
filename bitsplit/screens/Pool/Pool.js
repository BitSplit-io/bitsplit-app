import React, { Component } from 'react';
import { AppRegistry, View, Text, Button, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { StackNavigator } from 'react-navigation';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent'
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent'
import { GetPool, DoTransaction } from '../../src/api/ApiUtils';
import ScreenComponent from '../ScreenComponent';
const activePool = '';

export default class Pool extends ScreenComponent {

    constructor(props) {
        super();
        this.state = { activePool: props.navigation.state.params.item, visibleModal: false, enteredPassword: null };
    }

    toggleModal(state) {
        this.setState({ visibleModal: state });
    }



    renderModalContent() {
        return (
            <View style={styles.modalContent}>
                <View style={styles.contailer}>
                    <Text style={{ marginBottom: 15 }}>
                        Enter password for {this.state.activePool.poolDetails.poolName}
                    </Text>

                    <TextInput 
                        ref={(input) => this.passwordInput = input}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        textAlign='center'
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(password) => this.setState({ enteredPassword: password })}
                        value={this.state.enteredPassword}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.passwordInput.blur();
                        DoTransaction(this.state.enteredPassword, this.state.activePool.poolDetails.poolId).then((result) => {
                            result.status == "success" ?
                                console.log("Success!") :
                                result.message ?
                                    this.ShowMessage(result.message, true) :
                                    console.log("no error message")
                        },  (data) => { this.ShowMessage(data.message)})
                        .catch((error) => {
                            this.ShowMessage("There was an error.", true);
                        });
                    }}>
                    <Text style={styles.modalButton}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.toggleModal(false);
                    this.setState({ enteredPassword: null })
                }}>

                    <Text style={[styles.modalButton, { backgroundColor: '#ac4545' }]}>Cancel</Text>
                </TouchableOpacity>

            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>
                <Modal
                    isVisible={this.state.visibleModal}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                >
                    {this.renderModalContent()}
                </Modal>

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ height: "40%", flex: 1, flexDirection: "column", backgroundColor: "#fff" }}>
                        <View style={styles.pieContainer}>

                            {this.state.activePool.renderPoolPieChart(100)}

                        </View>

                        <View style={styles.qrContainer}>
                            <Text style={[{ textAlignVertical: 'center', fontSize: 16 }]}>
                                Press
                            </Text>
                            <Icon
                                name='qrcode'
                                type='font-awesome'
                                raised
                                reverse
                                style={styles.receiveButton}
                            onPress={() => navigate('Receive', this.state.activePool.poolDetails.poolId)}
                            />
                            <Text style={[{ textAlignVertical: 'center', fontSize: 16 }]}>
                                to receive a transaction
                            </Text>
                        </View>
                    </View>

                    <Button
                        title="Split revenue"
                        color={this.state.activePool.poolDetails.balance = 0 ? "#fff" : "#55ac45"}
                        onPress={() => this.toggleModal(true)}
                        disabled={this.state.activePool.poolDetails.balance = 0 ? true : false}
                    />

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
                                            title={item ? (item.proportion * 100).toFixed(1) + '%' : ''}
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
                                Balance
                            </Text>
                            <Text style={styles.subtitle}>
                                satoshi = {this.state.activePool.poolDetails.balance}
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Total revenue
                            </Text>
                            <Text style={styles.subtitle}>
                                satoshi = {this.state.activePool.poolDetails.balance}
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Transaction settings
                            </Text>
                        </View>

                        <Button
                            title="Edit pool"
                            color="#00BCFF"
                            onPress={() => navigate('EditPool', {
                                activePool: this.state.activePool,
                                onGoBack: (pool) => { this.setState({ activePool: pool }); return this;}
                            })}
                        />

                    </View>

                    <View style={{ height: 100 }}>
                    </View>

                </ScrollView>
                {this.MessageBarContainer()}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5',
    },
    input: {
        marginTop: 0,
        marginBottom: 10,
        height: 40,
        backgroundColor: 'rgba(255, 255 ,255, 0.5)',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16
    },
    modalContent: {
        backgroundColor: '#f5fff5',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    qrContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40,
        flexDirection: 'row',
    },
    receiveButton: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    pieContainer: {
        flex: 1,
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10,
    },
    infoContainer: {
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
    modalButton: {
        textAlignVertical: 'center',
        backgroundColor: '#55ac45',
        alignSelf: 'center',
        padding: 3,
        width: 200,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
        color: '#f5fff5'
    }
})