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

    refreshQR(btcAmount) {
        console.log("REFRESHING QR");
        GetReceiveQR(this.state.poolId, btcAmount?btcAmount:0).then(data => {
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
        if(this.state.BTCamount=='')this.setState({BTCamount: 0});
        if(this.state.CurrencyAmount=='')this.setState({CurrencyAmount: 0});
    }

    componentWillMount() {
        this.keyboardHidden();
        this.refreshQR();
        GetExchangeRate().then(BTCrate => this.setState({BTCrate: BTCrate}))
    }

    getCurrencyAmount(){
        return this.state.CurrencyAmount;
    }

    resetCurrencyState(){
        this.setState({CurrencyAmount: ''});
    }

    resetBTCState(){
        this.setState({BTCamount: ''})
    }

    numberify(input){
        input = input.replace(',', '.');
        if (input.startsWith('.'))
            input = "0" + input.toString();
        if (input < 0)
            input = " ";
        return input;
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
                    />
                </View>

                <Text style={[{padding: 20, textAlignVertical: 'center'}]}>
                    {this.state.receiveAdress}
                </Text>

                <View style={styles.inputWrapper}>

                    <Text style={styles.inputLabel}>
                        BTC
                    </Text>

                    <TextInput

                        style={styles.inputField}
                        placeholder={"0"}
                        keyboardType={'numeric'}
                        onChangeText={(input) => {
                            input = this.numberify(input);
                            this.setState({BTCamount: input});
                            this.setState({CurrencyAmount: input*this.state.BTCrate.data.USD['15m']});
                            this.refreshQR(input);
                        }                    
                        }
                        value={(this.state.BTCamount).toString().substr(0,7)}
                        onFocus={() => {
                            if(this.state.BTCamount == 0) this.resetBTCState();                            
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
                            input = this.numberify(input);
                            this.setState({CurrencyAmount: input});
                            this.setState({BTCamount: input/this.state.BTCrate.data.USD['15m']});    
                            this.refreshQR(input/this.state.BTCrate.data.USD['15m']);
                        }                    
                        }
                        onFocus={() => {
                            if(this.state.CurrencyAmount == 0) this.resetCurrencyState();
                            this.keyboardShown();
                        }
                        }
                        onBlur={() => {
                            this.keyboardHidden();
                        }
                        }
                        value={(this.state.CurrencyAmount).toString().substr(0,7)}                        
                    />

                </View>

                <Button
                    onPress={() => {
                        Clipboard.setString(this.state.receiveAdress);
                        this.notification && this.notification.show({
                            title: 'Successfully added to clipboard!',
                            message: 'You have now copied address, that accepts bitcoin, to your clipboard. Paste it somewhere for your client to use.',
                            vibrate: false,
                            onPress: () => this.notification.closeNotification()
                        })
                    }}
                    color="#00BCFF"
                    title={"Copy URL to Clipboard"}
                >
                </Button>

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
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        margin: 7,
        marginLeft: 20,
        paddingRight: 10,
        justifyContent: "center",
        alignItems: 'center',
        maxHeight: 100,
    },
    inputLabel: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'right',
        height: 50,   
        paddingRight: 10,
    },
    inputField: {
        flex: 2,
        justifyContent: 'center',
        textAlign: 'right',
        borderColor: "#ddd",
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