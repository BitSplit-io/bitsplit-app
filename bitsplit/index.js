import React from 'react';
import 'react-native';
import { AppRegistry } from 'react-native';
import Start from './config/router';
import { setEnvironment } from './src/services/environment';

export default class BitSplit extends React.Component {

  constructor(props){
    super(props);
    setEnvironment(this.props.environment);
  }

    render() {
      return <Start />;
    }
  }

AppRegistry.registerComponent('bitsplit', () => BitSplit);