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
import { CreateNewUser } from '../../src/api/ApiUtils';
import MessageBar from '../Notification/MessageBar';
import MessageBarManager from '../Notification/MessageBarManager';

export default class NewUser extends React.Component {

    constructor() {
        super();
        this.state = {email: '', username: '', password: '', confirmPassword: ''};
    };

    render() {
        
                const { navigate } = this.props.navigation;
                return (
        
                    <View style={styles.container}>
                        <StatusBar backgroundColor="#7EC480" barStyle="light-content" />
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
        
                        <View>
        
                            {/* ------ NEW USER FORM -------*/}
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='center'
                                onSubmitEditing={() => this.usernameInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(email) => this.setState({ email })}
        
                            />

                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='center'
                                ref={(input) => this.usernameInput = input}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(username) => this.setState({ username })}
        
                            />
        
                            <TextInput
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='center'
                                ref={(input) => this.passwordInput = input}
                                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(password) => this.setState({ password })}
                            />
        
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                textAlign='center'
                                ref={(input) => this.confirmPasswordInput = input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            />
        
        
                            {/* ------ LOGIN BUTTONS -------*/}
                            <TouchableOpacity
        
                                style={styles.buttonContainer}
        
                                onPress={() => CreateNewUser(this.state.email, this.state.username, this.state.password).then(results => {
                                    //No point showing success message on success
                                    console.log(results);
                                    results.status == "error" ? alert(results.message) : navigate('Home', {});
                                })
                                .catch((error) =>
                                        alert("error when processing sign up")
                                    )}
        
                            >
        
                                <Text style={styles.buttonText}>SIGN UP</Text>
        
                            </TouchableOpacity>
        
                        </View>
                        
        
                    </View>
                    
                )
                
            }

} 

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
