import {Platform} from 'react-native'

var env; //set from initialProps
var urls = {
    localhost: "http://localhost:8080",
    emulatorAndroid: "http://10.0.2.2:8080",
    production: "http://api.bitsplit.io:8080",
    staging: "http://api.staging.bitsplit.io:8080"
} 

export function setEnvironment(environment) {
    env = environment;
}

export function apiUrl() {
    if (!env.server){
        env.server = "localhost";
    }
    if (env.server === "localhost") {
        if (env.isEmulator && Platform.OS === "android") {
            return urls.emulatorAndroid;
        }
        return urls.localhost;
    }
    if(env.server === "staging") {
        return urls.staging;
    }
    if(env.server === "production") {
        return urls.production;
    }
}

export function isEmulator() {
    if(env) 
        return env.isEmulator
    throw "no environment";
}


