var username;
var userId;
var userPools = [];

import PoolComponent from "../Pool/PoolComponent";

export function setPools(poolData){
    PoolComponent
    this.userPools = []
    poolData.array.forEach(function(pool) {
        this.userPools.push(new PoolComponent(pool))
    }, this);
}

export function getPools(){
    return [{poolName: 'jacob', poolID: 'string'}]
    
    //return userPools;
}
    
export default class CurrentUser {

    constructor (username, userId) {
        username = username;
        userId = userId;
        console.log("CREATED USER WITH USERNAME: " + username + " AND USERID: " + userId)        
    }

}

export function getUser(username){



    return username;

}