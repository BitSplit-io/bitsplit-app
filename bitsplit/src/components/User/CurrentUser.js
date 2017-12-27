var username = {};
var userId = {};
var userPools = [];

export function SetUser(username, userId){
    this.username = username;
    this.userId = userId;
}

export function GetUserName(){
    return this.username;
}

export function GetUserId(){
    return this.userId;
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