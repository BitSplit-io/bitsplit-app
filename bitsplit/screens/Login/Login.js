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
    } from 'react-native';
import { RootNavigator } from '../../config/router';
import { LoginWithUsername } from '../../src/api/ApiUtils';
import MessageBar from '../Notification/MessageBar';
import MessageBarManager from '../Notification/MessageBarManager';
import CurrentUser from '../../src/components/User/UserComponent'

export default class Login extends React.Component {

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
      }
      componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
      }

    constructor() {
        super();
        this.state = { username: '', password: '' };
    };

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

                    <TextInput

                        placeholder="Email or username"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        textAlign='center'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}

                    />
                    
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
                    />




                    <TouchableOpacity

                        style={styles.buttonContainer}

                        onPress={() => LoginWithUsername('magnus', 'password').then(results => { 
                            //this.state.username , this.state.password).then(results => {
                            console.log(results);
                            //No point showing success message on success
                            // results.status == "error" ? alert(results.message) : navigate('Home', {});
                            if ( results.status == "error" ){
                                alert(results.message)
                            }else{
                                new CurrentUser(results.data.username, results.data.userId);
                                navigate('Home', {});
                            }
                            })}

                    >

                        <Text style={styles.buttonText}>LOGIN</Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                    onPress={() => navigate('NewUser', {})}

                    >

                        <Text style={styles.newUserButton}>Create new user</Text>

                    </TouchableOpacity>

                </View>
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
    }

});
