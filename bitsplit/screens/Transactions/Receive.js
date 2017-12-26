import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, StyleSheet, Animated, ScrollView, StatusBar, FlatList, TouchableOpacity, Image, Clipboard, Keyboard } from 'react-native';
import { List, ListItem, Icon, } from "react-native-elements";
import { RootNavigator } from '../../config/router';
import { StackNavigator } from 'react-navigation';
import PoolComponent from '../../src/components/Pool/PoolComponent';
import { GetReceiveQR, GetExchangeRate } from '../../src/api/ApiUtils';
import Notification from 'react-native-in-app-notification';

export default class ReceiveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            poolId: this.props.navigation.state.params,
            qrImage: null,
            receiveAdress: null,
            BTCamount: 0,
            CurrencyAmount: 0,
            animation: new Animated.Value(),
            BTCrate: null,
        };
    }

    refreshQR() {
        GetReceiveQR(this.state.poolId, this.state.BTCamount).then(data => {
            this.setState({ receiveAdress: data[0] });
            this.setState({ qrImage: data[1] });
        })
    }


    animateSize(initialValue, finalValue) {
        this.state.animation.setValue(initialValue);
        Animated.decay(
            this.state.animation,
            {
                delay: 100,
                duration: 1000,
                toValue: finalValue,
            }
        ).start();
    }


    keyboardShown() {
        this.animateSize(100, 300);
    }


    keyboardHidden() {
        this.animateSize(300, 100);
    }

    componentWillMount() {
        this.keyboardHidden();
        this.refreshQR();
        GetExchangeRate().then(BTCrate => this.setState({BTCrate: BTCrate}))
    }

    componentWillUnmount() {
        this.refreshQR()
    }

    render() {
        return (

            <View style={styles.container}>

                <Notification
                    ref={(ref) => { this.notification = ref; }}
                    closeInterval={1}
                    openCloseDuration={0}
                />


                <View style={styles.content}>
                    <Animated.Image
                        source={{ uri: this.state.qrImage == null ? "../../src/images/Logo.png" : this.state.qrImage }}
                        style={[styles.qrImage, { width: this.state.animation, height: this.state.animation }]}
                    //style={styles.qrImage}
                    />
                </View>

                <Button
                    onPress={() => {
                        Clipboard.setString(this.state.receiveAdress);
                        this.notification && this.notification.show({
                            title: 'You pressed it!',
                            message: 'The notification has been triggered',
                            vibrate: false,
                            onPress: () => this.notification.closeNotification()
                        })
                    }}
                    title={"Copy URL to Clipboard"}
                >
                </Button>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>
                        BTC
                    </Text>

                    <TextInput

                        style={styles.inputField}
                        placeholder={"0"}
                        keyboardType={'numeric'}
                        onChangeText={(input) => {
                            input = input.replace(',', '.');
                            if (input.startsWith('.'))
                                input = "0" + input.toString();
                            if (input < 0)
                                input = " ";
                                
                                this.state.BTCamount= input;
                                this.state.CurrencyAmount = this.state.BTCamount*this.state.BTCrate.data.USD['15m'];
                            this.refreshQR();
                        }                    
                        }
                        value={(this.state.BTCamount).toString().substr(0,7)}
                        onFocus={() => {
                            this.keyboardShown();
                        }
                        }
                        onBlur={() => {
                            this.keyboardHidden();
                        }
                        }
                    />
                    <Text style={styles.inputLabel}>
                        USD
                    </Text>

                    <TextInput

                        style={styles.inputField}
                        placeholder={"0"}
                        keyboardType={'numeric'}
                        onChangeText={(input) => {
                            input = input.replace(',', '.');
                            if (input.startsWith('.'))
                                input = "0" + input.toString();
                            if (input < 0)
                                input = " ";
                            this.state.CurrencyAmount = put;
                            this.state.BTCamount = this.state.CurrencyAmount/this.state.BTCrate.data.USD['15m'];    
                            this.refreshQR();
                            console.log(this.state.BTCamount)
                            console.log(this.state.CurrencyAmount)
                        }                    
                        }
                        value={(this.state1.CurrencyAmount).toString().substr(0,7)}
                        onFocus={() => {
                            this.keyboardShown();
                        }
                        }
                        onBlur={() => {
                            this.keyboardHidden();
                        }
                        }
                    />

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
    qrImage: {
        justifyContent: "center",
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        margin: 7,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: "#222",
        borderWidth: 1,
        maxHeight: 100,
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