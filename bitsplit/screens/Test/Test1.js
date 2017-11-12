import React from 'react';
import { Text, View, Button } from 'react-native';

export default class Test1 extends React.Component {
    static navigationOptions = {
        title: 'Test1',
    };
    render() {
        return(
            <View>
                <Text>This is screen1</Text>
                <Button
                    /* onPress={
                       () =>
                    } */
                    title = 'Go to Test2'
                />
            </View>
        );
    }
}