var username;
var userId;
var userAddress;
var userPools = [];
var userCoinPrefix;
var userCurrency;
var userColor;

export function SetUser(username, userId, userAddress, userCoinPrefix, userCurrency, userColor){
    this.username = username;
    this.userId = userId;
    this.userAddress = userAddress;
    this.userCoinPrefix = userCoinPrefix;
    this.userCurrency = userCurrency;
    this.userColor = userColor;
}

export function ClearUser(){
    this.username = null;
    this.userId = null;
    this.userAddress = null;
    this.userCoinPrefix = null;
    this.userCurrency = null;
    this.userColor = null;
}

export function SetUserAddress(address) {
    this.userAddress = address;
}

export function SetUserPools(pools){
    this.userPools = pools;
}

export function GetUserPools() {
    return this.userPools;
}

export function GetUserName(){
    return this.username;
}

export function GetUserId(){
    return this.userId;
}

export function GetUserAddress(){
    return "mi2dxB9zRydgxLxKRTgJpqF9XSoqKnyEUp";
    // return this.userAddress;
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