import React, { Component } from 'react';
import { AppRegistry, View, Text, Button, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { StackNavigator } from 'react-navigation';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent'
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent'
import { GetPool, DoTransaction } from '../../src/api/ApiUtils';
import MessageBar from '../Notification/MessageBar';
import MessageBarManager from '../Notification/MessageBarManager';

const activePool = '';

export default class Pool extends Component {

    constructor(props) {
        super(props);
        this.state = { activePool: this.props.navigation.state.params.item, visibleModal: false, enteredPassword: null};
    }

    toggleModal(state) {
        this.setState({ visibleModal: state });
    }

    showError(message) {
        console.log("Error shown");
        MessageBarManager.showAlert({
            message: message,
            alertType: "error",
        });
    }

    renderModalContent() {
        return (
            <View style={styles.modalContent}>
                <View style={styles.contailer}>
                <Text style={{marginBottom: 15}}>
                    Enter password for {this.state.activePool.poolDetails.poolName}
                </Text>

               <TextInput 
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
                    DoTransaction(this.state.enteredPassword, this.state.activePool.poolDetails.poolId).then((result) => {
                        result.status == "success" ?
                            console.log("Success!") :
                            result.message ?
                                this.showError(result.message) :
                                console.log("no error message")
                    }).catch((error) => {
                        alert("there was an error")
                    });
                }}>
                        <Text  style={styles.modalButton}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.toggleModal(false);
                    this.setState({enteredPassword: null})
                }}>

                    <Text style={[styles.modalButton, {backgroundColor: '#ac4545'}]}>Cancel</Text>
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

                    <View style={styles.pieContainer}>

                        {this.state.activePool.renderPoolPieChart()}


                    </View>

                    <View style={styles.qrContainer}>
                        <Text style={[{ textAlignVertical: 'center', fontSize: 16 }]}>
                            Press icon to receive a transaction:
                            </Text>
                        <Icon
                            name='qrcode'
                            type='font-awesome'
                            raised={true}
                            style={styles.receiveButton}
                            onPress={() => navigate('Receive', this.state.activePool.poolDetails.poolId)}
                        />
                    </View>

                    <Button
                        title="Split revenue"
                        color="#00BCFF"
                        onPress={() => this.toggleModal(true)}
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
                                            title={item ? (item.proportion * 100) + '%' : ''}
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
                                satoshi {this.state.activePool.poolDetails.balance}
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


                    </View>

                </ScrollView>
                <MessageBar
                    ref="alert"
                    duration={2000}
                    viewTopOffset={10}
                    stylesheetSuccess={{
                        backgroundColor: '#97b7e5',
                        strokeColor: '#97b7e5',
                        titleColor: '#ffffff',
                        messageColor: '#ffffff'
                    }}
                />
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
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        padding: 30,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    receiveButton: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
    modalButton: {
        textAlignVertical:'center',
        backgroundColor:'#55ac45',
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