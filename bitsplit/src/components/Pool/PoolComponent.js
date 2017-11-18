import React, { Component } from 'react';

var poolData = null;

export default class PoolComponent extends Component {
    constructor (data) {
        this.poolData = data;
    }
    get poolId(){
        return this.poolData.poolId;
    }
    get poolName(){
        return this.poolData.poolName;
    }
    get poolAdmin(){
        return this.poolData.poolAdmin;
    }
    get recipients(){
        return this.poolData.recipients;
    }
    get poolTransactionFee(){
        return 1;
    }
    get poolAutomization(){
        return false;
    }
}


export function renderAsList (_onPress) {
    //Onpress navigate('Pool', {})
    return (
        <View style={{ borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', height: 70 }}>
            <TouchableOpacity
                onPress={() => _onPress()}
            >
                <Text>{poolData.poolName}</Text>
                <Text>{poolData.poolID}</Text>
                {poolData.poolAdmin && <Text>Admin</Text>}
            </TouchableOpacity>
        </View>
    );
}


export function renderAsPieChart () {
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
    );
}



class ManagePool extends PoolComponent {

    set poolName(name){
        this.poolName = name;
    }

    set poolMember(newMember){
        this.poolMember = newMember;
    }
}
