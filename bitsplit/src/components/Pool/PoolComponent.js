import React, { Component, FlatList, } from 'react';
import { List, ListItem, } from "react-native-elements";
import Pie from 'react-native-pie';
import Toast from 'react-native-simple-toast';

const colors = [    
                    '#55ac45',
                    'rgba(255, 153, 255, 0.16)',
                    'rgba(255, 255, 0, 0.16)',
                    'rgba(0, 255, 255, 0.16)',
                    'rgba(255, 0, 255, 0.16)',
                    'rgba(255, 0, 0, 0.16)',
                    'rgba(0, 255, 0, 0.16)',
                    'rgba(0, 0, 255, 0.16)',
                ]
 

export default class PoolComponent extends Component {
    
    constructor(data) {
        super();
        this.poolDetails = data == undefined ?
            { intermediateAddress: undefined, poolName: undefined, poolAdmin: undefined, poolPassword: undefined, poolId: undefined, recipients: [], transactionFee: 0.5}
            : data;
    }

    setPoolName(name){
        this.poolDetails.poolName = name;
    }
    
    setPoolPassword(password){
        this.poolDetails.poolPassword = password;
    }
    
    setPoolAdmin(admin){
        this.poolDetails.poolAdmin = admin;
    }
    
    addPoolRecipient(recipient){  
        this.poolDetails.recipients.map(a => a.address).includes(recipient.address) ?
        Toast.show('Can not add two members with same address.') :
        this.poolDetails.recipients.push(recipient);
    }

    setPoolRecipients(recipients){
        this.poolDetails.recipients = recipients;
    }

    setTransactionFee(transactionFee) {
        this.poolDetails.transactionFee = transactionFee;
    }

    removeRecipient(recipient) {
        console.log("före")
        this.poolDetails.recipients = this.poolDetails.recipients.filter(item => item !== recipient);
        console.log("efter")
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
