import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ScrollView, StatusBar, ListView } from 'react-native';
import Pie from 'react-native-pie';
// import PoolComponent from '../../src/components/Pool/PoolComponent'

export default class Pool extends Component {

    render() {

        return (

            <View style={styles.container}>


                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.pieContainer}>

                        <Pie
                            radius={100}
                            series={[25, 25, 50,]}
                            colors={['#55ac45', '#099', '#909']} />

                    </View>

                    <View style={styles.infoContainer}>

                        <View style={styles.titleSegment}>
                            <Text style={styles.title}>
                                Pool Name
                            </Text>
                            <Text style={styles.subtitle}>
                                #AJDIr32234iasdij3e3
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Members
                            </Text>

                            {/* <ListView
                                    renderRow={this._renderMemberList}
                                     dataSource={this.state.dataSource}
                            /> */}

                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Revenue
                            </Text>
                        </View>

                        <View style={styles.infoSegment}>
                            <Text style={styles.title}>
                                Transaction settings
                            </Text>
                        </View>


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
    pieContainer: {
        flex: 1,
        margin: 70,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10,
        // position: 'absolute',
    },
    infoContainer: {
        // top: 100,
        flex: 1,
        backgroundColor: '#f5fff5',
        minHeight: 500,
        borderTopWidth: 2,
        borderTopColor: '#E0E0E0',
        zIndex: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '100',
        paddingLeft: 24,
    },
    titleSegment: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    },
    infoSegment: {
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A0A0',
    }
})