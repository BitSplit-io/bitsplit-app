var username = {};
var userId = {};
var userPools = [];
var userCoinPrefix = {};
var userCurrency = {};
var userColor = {};

export function SetUser(username, userId, userCoinPrefix, userCurrency, userColor){
    this.username = username;
    this.userId = userId;
    this.userCoinPrefix = userCoinPrefix;
    this.userCurrency = userCurrency;
    this.userColor = userColor;
}

export function GetUserName(){
    return this.username;
}

export function GetUserId(){
    return this.userId;
}

export function GetUserCoinPrefix(){
    return this.userCoinPrefix;
}

export function GetUserCurrency(){
    return this.userCurrency;
}

export function  GetUserColor(){
    return this.userColor;
}

// export function setPools(poolData){
//     PoolComponent
//     this.userPools = []
//     poolData.array.forEach(function(pool) {
//         this.userPools.push(new PoolComponent(pool))
//     }, this);
// }

// export function getPools(){
//     return userPools;
// }