import React from 'react';
import 'react-native';
import { AppRegistry } from 'react-native';
import Start from './config/router';
import { setEnvironment } from './src/services/environment';
import  './src/services/FirebaseIntegration';
import  UserNotification from './src/components/UserNotification'

export default class BitSplit extends React.Component {

  constructor(props){
    super(props);
    setEnvironment(this.props.environment);
    new UserNotification();
  }

    render() {
      return <Start />;
    }
  }

AppRegistry.registerComponent('bitsplit', () => BitSplit);