import React, { Component } from 'react';
import { MessageBarContainer, ShowMessage, registerMessageBar } from '../src/components/UserNotification'


export default class ScreenComponent extends React.Component {

    componentDidMount() {
        registerMessageBar(this);
        var ogb = null;
        try { ogb = this.props.navigation.state.params.onGoBack }
        catch (e) {error = true}
        if(ogb)
        this.onGoBack = (...args) => {
            registerMessageBar(ogb());
            (ogb(...args))
        }
    }

    MessageBarContainer() {
        return MessageBarContainer();
    }

    ShowMessage(...args) {
        ShowMessage(...args);
    }

    componentWillUnmount() {
        if(this.onGoBack)
        this.onGoBack();
    }
}



