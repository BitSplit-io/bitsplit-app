'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { Icon } from "react-native-elements";

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRScanner extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataResult: null
    }
  }

  onSuccess(e) {
      this.setState({dataResult: (e.data)});
  }

  render() {
    return (
      <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
            />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

// AppRegistry.registerComponent('default', () => ScanScreen);