import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MessageBar from '../../screens/Notification/MessageBar';
import MessageBarManager from '../../screens/Notification/MessageBarManager';
import { onNotificationReceived } from '../services/FirebaseIntegration';

export default class UserNotification extends React.Component{
    constructor(props){
        super(props);
        onNotificationReceived(function(message){ 
            var presentationtext = '';
            if (message.title){
                presentationtext +=  message.title + " \n"; 
            }
            presentationtext += message.body;
            ShowMessage(presentationtext, null,10000);
        });
    }
}
var registered;



export function registerMessageBar(registrar) {
    MessageBarManager.registerMessageBar(registrar.refs.alert);
    registered = false;
}

export function unregisterMessageBar() {
    if(registered){
        MessageBarManager.unregisterMessageBar();
        registered = true;
    }
}

export function MessageBarContainer() {
    return (
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
    );
}

export function ShowMessage(message, error, duration) {
    MessageBarManager.showAlert({
        message: message,
        alertType: !error ? "sucess" : "error",
        duration: duration ? duration : null
    });
}
