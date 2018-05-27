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
import EditPoolMembers from '../../../screens/Pool/EditPoolMembers';

export default class QRScanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataResult: null
    }
  }

  onSuccess(e) {

    var result = e.data.substring(0, e.data.indexOf("?"));

    result = result.replace("bitcoin", "");
    result = result.replace(/\//g, "");
    result = result.replace(/\:/g, "");

    this.props._reactInternalInstance.type.prototype.AddRecipient(result, this.props);

    this.props.setState({
      qrScannerState: {
        visible: false,
      }
    });

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