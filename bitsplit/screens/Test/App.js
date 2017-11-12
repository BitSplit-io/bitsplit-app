import React from 'react';
import { Text, View } from 'react-native';
import Test1 from './Test1';
import Test2 from './Test2';

import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator({
    Test1: {screen: Test1},
    Test2: {screen: Test2},
});

export default Navigation;