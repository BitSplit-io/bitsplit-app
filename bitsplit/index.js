import React from 'react';
import 'react-native';
import { AppRegistry } from 'react-native';
import Start from './config/router';

export default class BitSplit extends React.Component {
    render() {
      return <Start />;
    }
  }

AppRegistry.registerComponent('bitsplit', () => BitSplit);