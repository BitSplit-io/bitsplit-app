import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Pie from 'react-native-pie';
// import PoolComponent from '../../src/components/Pool/PoolComponent'

export default class Pool extends Component {

    render() {

        const chart_wh = 250
        const series = [300, 10,]
        const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']


        return (

            <View style={styles.container}>

                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.pieContainer}>
                        
                        <Pie
                        radius={100}
                        series={[25, 25, 50,]}
                        colors={['#999', 'lime', '#55ac45']} />
                        
                    </View>

                    <View style={styles.infoContainer}>

                        <Text>
                            Fullt av info
                        </Text>

                    </View>
                </ScrollView>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fff5',
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#7EC480',
        minHeight: 500,
    },
    pieContainer: {
        flex: 1,
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        margin: 10
    },
})