import React, { Component } from 'react';

export default class PoolComponent extends Component {
    

    get poolID(){
        super();
    }
    get poolName(){
        super();
    }
    get poolAdminUserID(){
        super();
    }
    get recipients(){
        super();
    }
    get poolTransactionFee(){
        super();
    }
    get poolAutomization(){
        super();
    }

}

class CreateNewPool extends PoolComponent {
    
    constructor (properties) {
        super();
    
        this.poolID = '';
        this.poolAddress = '';
        this.poolName = '';
        this.poolAdminUserID = '';
        this.poolMember[] = '';
        this.poolTransactionFee = '';
        this.poolAutomization = '';
    
    }

    set poolAdminUserID(userID){
        this.poolAdminUserID = userID;
    }

    set poolID(value){
        this.poolID = value;
    }

}

class ManagePool extends PoolComponent {

    set poolName(name){
        this.poolName = name;
    }

    set poolMember(newMember){
        this.poolMember = newMember;
    }
}

class GenerateAddress extends Component {

}
