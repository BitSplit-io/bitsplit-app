import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Image } from 'react-native';
import { RootNavigator } from '../../config/router';

export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
    };

    componentWillMount() {
        setTimeout( () => {
            AsyncStorage.getItem('@UserStore:username').then((value) => {
                if(!value){
                    throw new Error("no user");                
                }
                this.props.navigation.navigate('ConfirmPasswordScreen', {value})
            }).catch((error) => {
                this.props.navigation.navigate('Login', {})
            })}, 1000    
        )
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#7EC480', height: '100%', }]}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../src/images/Logo.png')} />
                    </View>
                <ActivityIndicator size={100} color='#448747' style={{paddingBottom: 50}}/>
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
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
});
