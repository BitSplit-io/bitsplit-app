import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, ScrollView, Text, TextInput, StatusBar, TouchableOpacity, Alert, Vibration, TouchableHighlight, } from 'react-native';
import { List, ListItem, Icon, Button, Slider } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import Swipeout from "react-native-swipeout";
import Modal from "react-native-modal";
import { GetUserAddress, GetUserId } from "../../src/components/User/CurrentUser";
import { validateAddress, validateUserAsRecipient } from "../../src/api/ApiUtils";
import Toast from 'react-native-simple-toast';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import QRScanner from "../../src/components/QRScanner/QRScanner";
import ScreenComponent from '../ScreenComponent';

export default class EditPoolMembers extends ScreenComponent {

    constructor(props) {
        super(props);

        // The current pool is defined by taking props from the previous screen.
        // The content of the pool can be managed through the state "activePool"
        console.log("");
        console.log(props.navigation.state.params.props);
        var pool = props.navigation.state.params.props;

        this.state = {
            // Firstly a boolean is set depending on wether the pool has been filled with users already.
            isNewPool: !pool.poolDetails.recipients.length,
            // The passed pool is set to the state "activePool"
            activePool: pool,
            numberInput: 0,
            textfields: [],
            currentRecipient: "",
            modalState: {
                visible: false,
                item: undefined,
            },
            qrScannerState: {
                visible: false,
            }
        };

        // TODO: Allow user to set default address to user
        //
        // Setting a first entry of the users own address on mounting component
        if (this.state.isNewPool && GetUserAddress()) {
            if (GetUserAddress()) {
                this.state.activePool.addPoolRecipient({ address: GetUserAddress(), proportion: 1 });
            }
        }
    };

    AddRecipient(recipient) {

        // TODO: Implement 
        // To validate an input
        var promise;

        if (recipient.length > 5 && recipient.length < 20) {
            promise = validateUserAsRecipient(recipient);
        }
        else {
            promise = validateAddress(recipient);
        }

        promise.then((response) => {
            if (response.status && response.status == "error") {
                Toast.show("Could not create valid recipient for the user or address submitted.")
            } else {
                this.state.activePool.addPoolRecipient({ address: recipient, proportion: 0 });
                if (this.state.isNewPool) this.evenSplit();
                this.setState({ currentRecipient: "" })
                this.clearText();
            }
        }).catch((error) => {
            alert(error);
            return false;
        })
    }

    addTextfield(textfield) {
        if (textfield && !this.state.textfields.includes(textfield))
            this.state.textfields.push(textfield);
    }

    clearText() {
        this.state.textfields.forEach((textfield) => {
            textfield.clear();
        });
    }

    evenSplit() {
        console.log(this.state.activePool);
        this.state.activePool.poolDetails.recipients.forEach((recipient) => {
            console.log("before split");
            recipient.proportion = 1 / this.state.activePool.poolDetails.recipients.length
            console.log("after split");
        })
    };

    proportionHandler(item) {
        var maxValue = 1, freeProportion = 0;
        var freeSliders = [];
        var activeSlider = item;
        this.state.activePool.poolDetails.recipients.forEach((recipient) => {
            if (recipient.isLocked) {
                maxValue -= recipient.proportion;
            } else if (recipient !== item) {
                freeProportion += recipient.proportion;
                freeSliders.push(recipient);
            }
        })
        if (item.proportion > maxValue) {
            item.proportion = maxValue;
        };
        var freeSliderTotal = (maxValue) - item.proportion;
        if (freeProportion == 0) {
            if (freeSliders.length) {
                freeSliders.forEach((slider) => slider.proportion = ((maxValue - item.proportion) / freeSliders.length));
            }
        }
        else {
            var freeSliderChangePoportion = freeSliderTotal / freeProportion;
            freeSliders.forEach((slider) => slider.proportion *= freeSliderChangePoportion)
        }
    }

    // RENDER of single objects in the list of recipients
    // 
    renderRow(index) {
        var item = this.state.activePool.poolDetails.recipients[index];
        let swipeoutBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                this.toggleModal(true, item);
            }
        }];

        return (
            <Swipeout
                right={swipeoutBtns}
                autoClose={false}
                backgroundColor="#fff"
                disabled={!item.isLocked ? false : true}
                key={item.address}
            >

                <View style={styles.listComponent}  >

                    <View style={styles.topListRow}>

                        {/* Recipient name/identification */}
                        {/* ---------------------------------------------------------------- */}
                        <View>
                            <Text >
                                {item.address.substring(0, 20) + "..."}
                            </Text>
                        </View>

                        {/* Input field for recipient split */}
                        {/* ---------------------------------------------------------------- */}
                        <View style={styles.percentageField}>
                            <TextInput ref={component => this.addTextfield(component)}
                                style={[{
                                    width: 60,
                                    textAlign: "right",
                                }]}
                                underlineColorAndroid="transparent"

                                onChangeText={(value) => {
                                    if (!item.isLocked) {
                                        this.setState({ numberInput: value })
                                        var numValue = parseFloat(value);
                                        if (!isNaN(numValue)) {
                                            this.state.isNewPool = false;
                                            item.proportion = numValue / 100;
                                            this.setState({ numberInput: value })
                                        }
                                    }
                                }}
                                placeholder={(item.proportion * 100).toFixed(1)}
                                placeholderTextColor="#555"
                                keyboardType="numeric"
                                onSubmitEditing={() => {
                                    if (!item.isLocked) {
                                        this.proportionHandler(item);
                                    }
                                    this.setState({ numberInput: "" })
                                    this.clearText();
                                    this.forceUpdate();
                                }}
                            />
                            <Text>
                                %
                        </Text>

                        </View>
                    </View>

                    <View style={styles.bottomListRow}>

                        <Slider
                            style={styles.slider}
                            thumbTintColor="#00BCFF"
                            maximumTrackTintColor="#b0e0e6"
                            minimumTrackTintColor="#4169e1"
                            disabled={item.isLocked}
                            step={0.001}
                            value={this.state.activePool.poolDetails.recipients[index].proportion}
                            //Hack to make slider go back to max if > max
                            onSlidingComplete={() => { if (item.proportion) item.proportion += 1e-10; this.forceUpdate(); }}
                            onValueChange={(value) => {
                                this.state.isNewPool = false;
                                console.log("item.proportion BEFORE: " + item.proportion);
                                item.proportion = value;
                                console.log("item.proportion AFTER: " + item.proportion);
                                this.proportionHandler(item);
                                this.clearText();
                                this.setState(this.state);
                                //this.updateListObjects();
                            }}
                        />

                        <View style={styles.lockIcon}>
                            <Icon
                                name={item.isLocked ? 'lock' : 'lock-open'}
                                color={item.isLocked ? '#000' : '#aaa'}
                                type='FontAwesome'
                                onPress={() => { item.isLocked = !item.isLocked; this.forceUpdate() }}
                            />
                        </View>
                    </View>
                </View>
            </Swipeout>

        );
    }

    renderList(list) {
        var view = [];
        console.log("inne");
        for (var i = 0; i < list.length; i++) {
            view.push(this.renderRow(i));
        }
        //list.forEach((item) => view.push(this.renderRow(item)));
        return (view);
    }

    toggleModal(state, item) {
        this.setState({ modalState: { visible: state, item: item } });
    }

    renderModalContent() {
        return (
            <View style={styles.modalContent}>
                <View style={styles.container}>
                    <Text style={{ marginBottom: 15 }}>
                        Do you really want to remove {this.state.modalState.item ? this.state.modalState.item.address : ""} from this pool?
                </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.state.activePool.removeRecipient(this.state.modalState.item);
                        this.toggleModal(false);
                    }}>
                    <Text style={styles.modalButton}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.toggleModal(false);
                }}>
                    <Text style={[styles.modalButton, { backgroundColor: '#ac4545' }]}>Cancel</Text>
                </TouchableOpacity>
            </View>

        );
    }

    // A QR-scanner is rendered inside of a modal
    // This allows for a user to utlize a camera of the smartphone 
    // to easily add an address to the pool.
    renderQRScannerModalContent() {
        return (
            <View style={styles.modalContent}>
                <Icon
                    name='x'
                    type='feather'
                    color='#999'
                    onPress={() => this.setState({ qrScannerState: { visible: false } })}
                />

                <QRCodeScanner
                    // In case of a discovered QR-code in the camera, the scanner runs method onSuccessQRScan() with the result.
                    onRead={this.onSuccessQRScan.bind(this)}
                />

                <Text style={{ color: "#999", textAlign: "center" }}>
                    Scan a QR code from Bitcoin address
                </Text>
            </View>
        );
    }

    // In case of a successful scan, the QR scanner runs this method.
    // Here, the output string is refactored to only contain 
    onSuccessQRScan(e) {

        var result = e.data.substring(0, e.data.indexOf("?"));

        result = result.replace("bitcoin", "");
        result = result.replace(/\//g, "");
        result = result.replace(/\:/g, "");

        this.AddRecipient(result);
        this.setState({
            qrScannerState: {
                visible: false,
            }
        });
        if (this.state.isNewPool) this.state.isNewPool = false;
    }

    render() {

        super.render;
        const { navigate } = this.props.navigation;

        var swipeoutBtns = [
            {
                text: 'Button'
            }
        ]

        return (
            <View style={styles.container}>

                <Modal
                    isVisible={this.state.modalState.visible}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                >
                    {this.renderModalContent()}
                </Modal>

                <Modal
                    isVisible={this.state.qrScannerState.visible}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={900}
                >
                    {this.renderQRScannerModalContent(this.state.qrScannerState.visible)}
                </Modal>

                <View style={styles.title}>
                    <TextInput
                        style={styles.textField}
                        placeholder="Enter Bitcoin-address or BitSplit username"
                        placeholderTextColor="rgba(128,128,128,0.6)"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        textColor="#000"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(currentRecipient) =>
                            this.setState({ currentRecipient })
                        }
                        value={this.state.currentRecipient}
                        onSubmitEditing={() => {
                            this.AddRecipient(this.state.currentRecipient);
                        }}

                    >
                    </TextInput>
                    <Icon
                        name='qrcode'
                        type='font-awesome'
                        color='#000'
                        onPress={() => this.setState({ qrScannerState: { visible: true } })}
                    />
                </View>

                <ScrollView style={{ flex: 1 }}>
                    {this.renderList(this.state.activePool.poolDetails.recipients)}
                </ScrollView>
                {this.MessageBarContainer()}
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
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7EC480',
    },
    title: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        backgroundColor: '#eee',
        borderBottomWidth: 0.5,
        borderBottomColor: '#A0A0A0',
        paddingHorizontal: 15,
        height: 42,
        elevation: 5,
    },
    textField: {
        flex: 1,
        // height: 50,
        color: '#000',
        backgroundColor: '#eee',
        textAlign: 'center',
        fontSize: 14,
        // padding: 20,
    },
    listComponent: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
        borderRightWidth: 4,
        borderRightColor: "darkred",
    },
    topListRow: {
        height: 40,
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    percentageField: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#999",
        backgroundColor: '#f5fff5',
    },
    bottomListRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    lockIcon: {
        alignContent: 'center',
        marginLeft: 40,
        marginRight: 30,
        paddingBottom: 5,
    },
    slider: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#f5fff5',
        padding: 22,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: "80%",
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
});