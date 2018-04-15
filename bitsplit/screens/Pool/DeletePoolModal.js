import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, ScrollView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import Pie from 'react-native-pie';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import { GetUserId } from '../../src/components/User/CurrentUser';
import { renderPoolPieChart, renderMemberList, } from '../../src/components/Pool/PoolComponent';
import { DeletePool } from '../../src/api/ApiUtils';
import MessageBar from '../Notification/MessageBar';
import MessageBarManager from '../Notification/MessageBarManager';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';

export default class DeletePoolModal extends Component {

    constructor(props, navigation) {
        super();
        this.state = {
            isEnabled: false,
            poolId: props,
            deleteStage: 0,
            updateCallback: null,
            keywords: "poop",
            navigation: navigation,
        };

    }

    toggleModal(toggle) {
        this.state.isEnabled = toggle;
    }

    isEnabled() {
        return this.state.isEnabled;
    }

    setUpdateCallback(callback) {
        this.state.updateCallback = callback;
    }

    _deleteInit() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={{ marginBottom: 15 }}>
                        Are you really sure that you want to delete this pool?
                </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        DeletePool(this.state.poolId).then((response) => {
                            if (response.data && response.status == "success") {
                                this.state.keywords = response.data.keywords;
                                console.log(response.data);
                                this.state.deleteStage = 1;
                                this.state.updateCallback();
                            }
                            else {
                                alert("THERE WAS AN ISSUE");
                            }

                        })
                    }}>
                    <Text style={styles.modalButton}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.toggleModal(false);
                    this.state.updateCallback();
                }}>
                    <Text style={[styles.modalButton, { backgroundColor: '#ac4545' }]}>Abort</Text>
                </TouchableOpacity>
            </View>
        )
    }

    deleteConfirmed() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={{ marginBottom: 15 }}>
                        These are your mnemotic keywords. Write these down on a piece of paper. As long as you have these with your unique password, you will always be able to recreate the wallet that was used for this pool.
                </Text>
                    <Text style={{ marginBottom: 15 }}>

                        {this.state.keywords}
                    </Text>
                    <Text style={{ marginBottom: 15 }}>
                        We have deleted this wallet from our databases permanently.
                </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.state.navigation.dispatch(
                            NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })]
                            }))
                    }}>
                    <Text style={styles.modalButton}>OK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderModal() {
        switch (this.state.deleteStage) {
            case 0:
                return this._deleteInit();
                break;
            case 1:
                return this.deleteConfirmed();
                break;
        }
    }

    render() {
        return (
            <View style={styles.modalContent}>

                {this._renderModal()}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#f5fff5',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
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
    },
})