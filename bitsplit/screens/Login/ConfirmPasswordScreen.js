import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';
import RNFirebaseToken from 'RNFirebaseToken';
import { RootNavigator } from '../../config/router';
import { LoginWithUsername } from '../../src/api/ApiUtils';
import { NavigationActions } from 'react-navigation';
import ScreenComponent from '../ScreenComponent';

export default class ConfirmPasswordScreen extends ScreenComponent {
    constructor(props) {
        super();
        this.state = { username: props.navigation.state.params.value, password: '', isLoading: false };
    };

    _login() {
        !this.state.isLoading && (
            this.setState({ isLoading: true }) ||
            LoginWithUsername(this.state.username, this.state.password)
                .then(results => {
                    results.status == "success" ?
                        this.props.navigation.dispatch(
                            NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })]
                            })) :
                        this.ShowMessage(results.message, true);
                }).catch((error) =>{
                    this.ShowMessage("An error occured", true);
                    console.log(error);
                })
                .finally(() => {
                    this.setState({ isLoading: false });
                })
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7EC480" barStyle="light-content" />
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../src/images/Logo.png')} />
                    <Text style={styles.title}>
                        BitSplit
                    </Text>
                </View>
                <View>
                    <Text style={[styles.title, { fontSize: 20, marginBottom: 10 }]}>
                        {this.state.username + "\n"}
                        confirm password to continue
                                </Text>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        textAlign='center'
                        ref={(input) => this.passwordInput = input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        onSubmitEditing={() => this._login()}
                    />

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this._login()}
                    >
                        <Text style={[styles.buttonText, { paddingLeft: this.state.isLoading ? 45 : 0 }]}>LOG IN</Text>
                        {this.state.isLoading && <ActivityIndicator style={{ paddingLeft: 25 }} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Login', {})
                            AsyncStorage.multiRemove(['@UserStore:userId', '@UserStore:username']);
                        }}
                    >
                        <Text style={styles.newUserButton}>Use a different account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    >
                        <Text style={styles.forgotPasswordButton}>forgot password?</Text>
                    </TouchableOpacity>
                </View>
                {this.MessageBarContainer()}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7EC480',
        padding: 20,
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(234, 246, 235, 0.1)',
        marginBottom: 10,
        color: '#f5fff5',
        paddingHorizontal: 10,
        fontSize: 16
    },

    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '500',
        color: '#ffffff'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 200,
        height: 200,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#55ac45',
        paddingVertical: 15,
    },

    buttonText: {
        textAlign: 'center',
        color: '#f5fff5',
        fontWeight: 'bold',
        fontSize: 20
    },

    newUserButton: {
        alignSelf: 'center',
        padding: 3,
        width: 200,
        borderWidth: 0.5,
        borderColor: '#f5fff5',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#f5fff5',
        opacity: 0.5
    },
    forgotPasswordButton: {
        fontSize: 11,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#f5fff5',
        opacity: 0.5,
    }
});
