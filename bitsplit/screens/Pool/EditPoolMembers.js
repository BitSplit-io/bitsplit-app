import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, ScrollView, Text, TextInput, StatusBar, TouchableOpacity, Alert, Vibration, } from 'react-native';
import { List, ListItem, Icon, Button, Slider } from "react-native-elements";
import { RootNavigator } from '../../config/router';


export default class EditPoolMembers extends Component {

    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.props);
        var pool = props.navigation.state.params.props;
        this.state = {
            activePool: pool,
            isNewPool: !pool.poolDetails.recipients.length,
            numberInput: 0,
            textfields: []
        }
    };

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
        this.state.activePool.poolDetails.recipients.forEach((recipient) => {
            recipient.proportion = 1 / this.state.activePool.poolDetails.recipients.length
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
        this.props.navigation.state.params.onGoBack()
    }

    renderRow(item) {
        return (
            <View style={styles.listComponent}>
                <View style={styles.topListRow}>

                    <View>
                        <Text>
                            {item.address}
                        </Text>
                    </View>

                    <View style={styles.percentageField}>
                        <TextInput ref={component => this.addTextfield(component)}
                            style={[{
                                width: 45,
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
                                this.clearText();
                                this.setState({ numberInput: "" })
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
                        value={item.proportion}
                        //Hack to make slider go back to max if > max
                        onSlidingComplete={() => { if (item.proportion) item.proportion += 1e-10; this.forceUpdate(); }}
                        onValueChange={(value) => {
                            this.state.isNewPool = false;
                            console.log("item.proportion BEFORE: " + item.proportion);
                            item.proportion = value;
                            console.log("item.proportion AFTER: " + item.proportion);
                            this.proportionHandler(item);
                            this.forceUpdate();
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
        );
    }

    renderList(list) {
        var view = [];
        list.forEach((item) => view.push(this.renderRow(item)));
        return (view);
    }

    render() {

        super.render;

        return (

            <View style={styles.container}>

                <View style={styles.title}>

                    <TextInput
                        style={styles.textField}
                        placeholder="Enter Bitcoin-address or BitSplit username"
                        placeholderTextColor="rgba(128,128,128,0.8)"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        textColor="#000"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(recipient) => {
                            this.currentRecipient = { address: recipient, proportion: 0 },
                                this.setState({ currentRecipient: recipient })
                        }}
                        value={this.state.currentRecipient}
                        onSubmitEditing={() => {
                            this.state.activePool.addPoolRecipient(this.currentRecipient);
                            if (this.state.isNewPool) this.evenSplit();
                            this.setState({ currentRecipient: "" })
                            this.props.navigation.state.params.onGoBack()
                        }}

                    >
                    </TextInput>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {this.renderList(this.state.activePool.poolDetails.recipients)}
                </ScrollView>
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
    textField: {
        flex: 1,
        // height: 50,
        color: '#000',
        backgroundColor: '#eee',        
        textAlign: 'center',
        fontSize: 16,
        // padding: 20,
    },
    title: {
        backgroundColor: '#f5fff5',        
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
        height: 42,
        elevation: 5,
    },
    listComponent: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
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
        marginLeft: 25,
        marginRight: 20,
        paddingBottom: 5,
    },
    slider: {
        flex: 1,
    },
});