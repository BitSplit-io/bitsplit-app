import React, { Component, FlatList, } from 'react';
import { List, ListItem, } from "react-native-elements";
import Pie from 'react-native-pie';

var poolData = null;
const colors = [    
                    '#55ac45',
                    'rgba(255, 153, 255, 0.4)',
                    'rgba(255, 255, 0, 0.4)',
                    'rgba(0, 255, 255, 0.4)',
                    'rgba(255, 0, 255, 0.4)',
                    'rgba(255, 0, 0, 0.4)',
                    'rgba(0, 255, 0, 0.4)',
                    'rgba(0, 0, 255, 0.4)',
                ]


export default class PoolComponent extends Component {


    constructor(data) {
        super();
        this.poolDetails = data;
    }

    renderPoolPieChart() {

        var result = this.poolDetails.recipients.map(recipient => recipient.proportion * 100);
        console.log(result);
        return (
            <Pie
                radius={100}
                series={result}
                colors={colors}
            />
        );
    };
}

class ManagePool extends PoolComponent {



}
