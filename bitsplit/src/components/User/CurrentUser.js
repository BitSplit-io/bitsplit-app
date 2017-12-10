var username = {};
var userId = {};
var userPools = [];

import PoolComponent from "../Pool/PoolComponent";

// export class CurrentUser {

//     constructor (username, userId) {
//         username = username;
//         userId = userId;
//         console.log("CREATED USER WITH USERNAME: " + username + " AND USERID: " + userId)        
//     }

//     get username() {
//         return this.username
//     }

//     get userId() {
//         return this.userId
//     }
// }

export function SetUser(username, userId){
    this.username = username;
    this.userId = userId;
}

export function GetUserId(){
    return this.userId;
}

export function GetUserName(){
    return this.username;
}

export function setPools(poolData){
    PoolComponent
    this.userPools = []
    poolData.array.forEach(function(pool) {
        this.userPools.push(new PoolComponent(pool))
    }, this);
}

export function getPools(){
    return userPools;
}