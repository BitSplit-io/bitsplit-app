import React from 'react';
import { Text, View, Button } from 'react-native';

export default class Test2 extends React.Component {
    static navigationOptions = {
        title: 'Test2',
    };

    render() {
        return(
            <View>
                <Text>This is screen2</Text>
            </View>
        )
    }
}