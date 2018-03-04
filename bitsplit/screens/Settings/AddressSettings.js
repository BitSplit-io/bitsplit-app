import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard, CheckBox, Linking } from 'react-native';
import Modal from "react-native-modal";
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { NavigationActions } from 'react-navigation';
import { GetUserName, GetUserId } from '../../src/components/User/CurrentUser';
import { validateAddress } from "../../src/api/ApiUtils";
import Toast from 'react-native-simple-toast';

export default class AddressSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressModalVisible: false,
            confirmModalVisible: false,
            currentAddress: null,
            textInputValue: '',
            allowAddUserToPools: false
        }
    }

    toggleAddressModal(toggle) {
        this.setState({ addressModalVisible: toggle });
    }

    toggleConfirmModal(toggle) {
        this.setState({ confirmModalVisible: toggle });
    }

    renderConfirmWithoutAddressModal() {
        return (
            <View style={styles.modalContent}>
                <Text>
                    Are you sure you want to continue without adding an address? You can add it later from settings.
            </Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={() => {
                            this.toggleConfirmModal(false);
                            this.props.navigation.dispatch(
                                NavigationActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                                }))
                        }}>
                        <Text style={styles.modalbuttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ac4545' }]} onPress={() => {
                        this.toggleConfirmModal(false);
                    }}>
                        <Text style={styles.modalbuttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderAddAddressModal() {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.welcomeFont}>
                    Enter you existing BTC address.
                </Text>
                <TextInput style={{ width: "100%", marginBottom: 10, backgroundColor: "rgba(0,0,0,0.05)" }}
                    onChangeText={(value) => this.setState({ textInputValue: value })}>

                </TextInput>
                <View style={[styles.button, { width: "150%", marginBottom: 10 }]}>
                    <TouchableOpacity style={{}} onPress={() => Linking.openURL("coinbase://")}>
                        <Text style={styles.infoFont}>
                            Connect using Coinbase app
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* TODO ADD ANDROID NATIVE LAUNCH OTHER APP piuk.blockchain.android: 
             <View style={[styles.button, {width:"150%"}]}>
                <TouchableOpacity style={{}} onPress={() => Linking.openURL("piuk.blockchain.android://")}>
                    <Text style={styles.infoFont}>
                        Connect using Blockchain app
                    </Text>
                </TouchableOpacity>
                </View>
                */}

                <View style={[styles.button, { width: "150%" }]}>
                    <TouchableOpacity style={{}} onPress={() => Linking.openURL("mycelium://")}>
                        <Text style={styles.infoFont}>
                            Connect using Mycelium app
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={() => {
                            promise = validateAddress(this.state.textInputValue)
                                .then((response) => {
                                    if (response.status && response.status == "success") {
                                        this.setState({ currentAddress: this.state.textInputValue });
                                        this.toggleAddressModal(false);
                                    } else {
                                        Toast.show("Invalid Bitcoin address.")
                                    }
                                }).catch((error) => {})
                        }}>
                        <Text style={styles.modalbuttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ac4545' }]} onPress={() => {
                        this.toggleAddressModal(false);
                    }}>
                        <Text style={styles.modalbuttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    getAddressText() {
        if (this.state.currentAddress) {
            return (
                <View>
                    <Text> you have linked: </Text>
                    <Text style={{ fontStyle: 'italic' }}>{this.state.currentAddress} </Text>
                    <Text>{"to your account.\n\nIf you check \"Let others add me to their pool\", other users can add you to their pool using your BtiSplit username."} </Text>
                </View>
            )
        }
        return (
            <Text>
                Adding an existing address will allow you to add it to your pools easily.
            </Text>
        )

    }

    showmodalOrContinue() {
        if (this.state.currentAddress) {
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                }))
        } else {
            this.toggleConfirmModal(true);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>

                <Modal
                    isVisible={this.state.addressModalVisible}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                >
                    {this.renderAddAddressModal()}
                </Modal>

                <Modal
                    isVisible={this.state.confirmModalVisible}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                >
                    {this.renderConfirmWithoutAddressModal(navigate)}
                </Modal>

                <ScrollView>
                    <View style={styles.infoSegment}>
                        <Text style={styles.welcomeFont}>
                            Welcome {GetUserName()}!
                            </Text>
                        <Text style={styles.infoText}>
                            Your BitSplit account has been created.
                                In order to easily create pools and recieve BTC, you can add your existing address to your account.
                                If you don't have a wallet, you can create one now.
                                If you are planning to only set up pools for others, you can skip this step.
                                You can also enable other people to add your wallet to their pools by using your BitSplit account, by checking "Let others add me to Pools".
                                You can change these settings at any time, from the settings screen.
                            </Text>
                    </View>

                    {/*<View style={styles.button}>
                        <TouchableOpacity onPress={() => navigate('Pool', { item })} underlayColor='#fff'>
                            <Text style={styles.infoFont}>
                                Create Bitcoin address
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoSegment}>
                        <Text>
                            This will generate a new Bitcoin address that you will create using your unique signature. Proceed?
                    </Text>
                    </View> */}

                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.toggleAddressModal(true)}>
                            <Text style={styles.infoFont}>
                                Connect your existing address
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoSegment}>

                        {
                            this.getAddressText()
                        }

                    </View>


                    <View style={styles.checkboxSegment}>
                        <Text style={styles.welcomeFont}>
                            Let others add me to Pools
                    </Text>
                        <CheckBox
                            onValueChange={(value) => this.setState({ allowAddUserToPools: value })}
                            value={this.state.allowAddUserToPools}
                        />
                    </View>



                </ScrollView>

                <View style={styles.doneButton}>
                    <TouchableOpacity onPress={() => this.showmodalOrContinue()} underlayColor='#fff'>
                        <Text style={styles.infoFont}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5',
    },
    inputLabel: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        borderColor: "#222",
        borderWidth: 1,
        height: 50,
    },
    inputField: {
        flex: 1,
        justifyContent: 'center',
        borderColor: "#222",
        borderWidth: 1,
        height: 50,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#f5fff5',
        minHeight: 500,
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        zIndex: 100,
    },
    welcomeFont: {
        padding: 10,
        fontSize: 20,
        fontWeight: '100',
        textAlign: "center",
        color: "#000",
    },
    infoFont: {
        padding: 10,
        fontSize: 20,
        fontWeight: '100',
        textAlign: "center",
        color: "#fff",
    },
    infoSegment: {
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 30,
    },
    checkboxSegment: {
        paddingLeft: 20,
        paddingRight: 30,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#7EC480",
    },
    doneButton: {
        justifyContent: "flex-end",
        backgroundColor: "#275629",
        borderWidth: 1,
    },
    modalContent: {
        backgroundColor: '#f5fff5',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    infoText: {
        textAlign: "justify",
    },
    modalButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        width: 100,
        margin: 20,
        backgroundColor: '#55ac45',
        alignSelf: 'center',
        borderColor: '#000',
        borderWidth: 0.5,
    },
    modalbuttonText: {
        color: '#fFfff5',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 3,
        marginBottom: 0,
    }
})