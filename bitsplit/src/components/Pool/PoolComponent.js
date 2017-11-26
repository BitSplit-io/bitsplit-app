import React, { Component } from 'react';

var poolData = null;

export default class PoolComponent extends Component {
    constructor(data) {
        super();
        this.poolData = data;
    }
    get poolId() {
        return this.poolData.poolId;
    }
    get poolName() {
        return this.poolData.poolName;
    }
    get poolAdmin() {
        return this.poolData.poolAdmin;
    }
    get recipients() {
        return this.poolData.recipients;
    }
    get poolTransactionFee() {
        return 1;
    }
    get poolAutomization() {
        return false;
    }
}


export function renderPoolList(_onPress) {
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


export function renderPoolPieChart() {
    const chart_wh = 250
    const series = [300, 10,]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
    return (
        <Pie
            radius={100}
            series={[100,]}
            colors={['#55ac45',]}
        />
    );
}



class ManagePool extends PoolComponent {

    set poolName(name) {
        this.poolName = name;
    }

    set poolMember(newMember) {
        this.poolMember = newMember;
    }
}
