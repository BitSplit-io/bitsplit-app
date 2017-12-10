import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ListView, ScrollView, Text, TextInput, StatusBar, TouchableOpacity, Alert, } from 'react-native';
import { List, ListItem, Icon, Button, } from "react-native-elements";
import { RootNavigator } from '../../config/router';


export default class EditPoolMembers extends Component {

    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.props);
        var pool = props.navigation.state.params.props;
        this.state = {
            activePool: pool,
            isNewPool: !pool.poolDetails.poolId,
            recipients: [],
        }
    };

    evenSplit() {
        this.state.activePool.poolDetails.recipients.forEach((recipient) => {
            console.log("SETTING FOR ONE USER"),
                recipient.proportion = 1 / this.state.activePool.poolDetails.recipients.length
        })
        console.log("FINNISHED SETTING PROPORTIONS");
    }

    render() {

        super.render;

        return (

            <View style={styles.container}>

                <View style={styles.textField}>

                    <TextInput
                        style={styles.title}
                        placeholder="Bitcoin-address or BitSplit username"
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
                            this.setState({ recipients: this.state.activePool.poolDetails.recipients })
                            this.setState({ currentRecipient: "" })
                            this.props.navigation.state.params.onGoBack()
                        }}

                    >
                    </TextInput>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <List>
                        {console.log(this.state.activePool.poolDetails.recipients)}
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
                </ScrollView>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5'
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
        flex: 1,
        height: 56,
        color: '#000',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textField: {
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
        height: 70,
    },
});