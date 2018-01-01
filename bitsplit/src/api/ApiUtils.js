import RNFetchBlob from 'react-native-fetch-blob';
import { AsyncStorage } from 'react-native'

var bitsplitURL = "http://172.20.10.2:8080";
var Auth_Headers = null;

export function GetBitsplitURL() {
    return bitsplitURL;
}

// ----------- USER ----------- //


export function LoginWithUsername(username, password) {
    return fetch(bitsplitURL + "/auth/login", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
            "username": username,
            "password": password,
        } // <-- Post parameters)
        )
    })
        .then(response => {
            console.log("logging in");
            return response.json();
        }).then(responseJson => {
            if (responseJson.status == "success") {
                Auth_Headers = {
                    "Authorization-Token": responseJson.data.authToken,
                    "Refresh-Token": responseJson.data.refreshToken,
                    "User-Id": responseJson.data.userId
                }
                console.log(Auth_Headers);
            }
            if(responseJson.status && responseJson.status == "success") {
                try {
                    AsyncStorage.setItem('@UserStore:userId', responseJson.data.userId);
                    AsyncStorage.setItem('@UserStore:username', responseJson.data.username);                    
                } catch (error) {
                    alert("DANGER DANGER");
                  }
            }
            return responseJson;
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })

}

export function Logout() {
    var headers = Object.assign({}, Auth_Headers)
    Auth_Headers = null
    return AsyncStorage.multiRemove(['@UserStore:userId', '@UserStore:username']).catch(() => {console.log("error")})
    fetch(bitsplitURL + "/auth/logout", {
        method: 'POST',
        headers: new Headers(
            headers
        )
    });
}


export function CreateNewUser(email, username, password) {
    return fetch(bitsplitURL + "/users/create", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        } // <-- Post parameters)
        )
    })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
            throw new error(error.message ? error.message : "Could not create user");
        })

}


// ----------- POOLS ------------ //

export function GetUserPools() {
    var headers = Object.assign({}, Auth_Headers)
    headers["Content-Type"] = "application/json"
    return fetch(bitsplitURL + "/users/" + Auth_Headers["User-Id"] + "/pools", {

        method: 'GET',
        headers: new Headers(
            headers
        ),
    }).then(response => {
        return response.json();
    }).then(responseJson => {
        return responseJson;
    })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}

export function GetPool(poolId) {
    var headers = Object.assign({}, Auth_Headers);
    headers["Content-Type"] = "application/json"

    return fetch(bitsplitURL + "/pools/" + poolId, {
        method: 'GET',
        headers: new Headers(
            headers
        ),
    })
        .then(response => {
            console.log('Pool details fetched');
            return response.json();
        }).then(responseJson => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}

export function CreateNewPool(poolName, poolAdmin, poolPassword, recipients, poolTransactionFee) {

    var headers = Object.assign({}, Auth_Headers);
    headers["Content-Type"] = "application/json"
    return fetch(bitsplitURL + "/pools/create", {
        method: 'POST',
        headers: new Headers(
            headers
        ),
        body: JSON.stringify({
            "poolName": poolName,
            "poolAdmin": poolAdmin,
            "poolPassword": poolPassword,
            "recipients": recipients,
            "poolTransactionFee": poolTransactionFee,
            // "poolAutomization": poolAutomization,
        } // <-- Post parameters)
        )
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}

export function UpdatePool(poolName, poolAdmin, poolPassword, recipients, poolTransactionFee) {

    var headers = Object.assign({}, Auth_Headers);
    headers["Content-Type"] = "application/json"
    return fetch(bitsplitURL + "/pools/" + poolId, {
        method: 'PUT',
        headers: new Headers(
            headers
        ),
        body: JSON.stringify({
            "poolName": poolName,
            "poolAdmin": poolAdmin,
            "poolPassword": poolPassword,
            "recipients": recipients,
            "poolTransactionFee": poolTransactionFee,
            // "poolAutomization": poolAutomization,
        } // <-- Post parameters)
        )
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}

/*------------------- Transaction APIs -----------------------*/

export function DoTransaction(poolPassword, poolId) {
    var headers = Object.assign({}, Auth_Headers);
    headers["Content-Type"] = "application/json";
    return fetch(bitsplitURL + "/pools/" + poolId + "/transact", {
        method: 'POST',
        headers: new Headers(
            headers
        ),
        body: JSON.stringify({
            "poolPassword": poolPassword,
        })
    })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}

export function GetReceiveQR(poolId, BTCamount) {

    var headers = Object.assign({}, Auth_Headers);
    headers["BTC-Amount"] = BTCamount.toString();
    return RNFetchBlob.fetch('GET', bitsplitURL + "/pools/" + poolId + "/receive-request", headers
    ).then((res) => {
        var result = [res.respInfo.headers["Receive-Request-URL"], "data:image/jpg;base64," + res.base64()];
        return result
    }).catch(error => {
        console.log(error);
        alert("THERE WAS AN ERROR");
    })

    /*
}).then(response => response.blob()).then(myBlob => {
        console.log("CREATING URL FOR BLOB")
        return URL.createObjectURL(myBlob);
    })
    .catch(error => {
        console.log(error)
        alert("THERE WAS A NETWORK ERROR");
    })
 
*/
}

export function GetExchangeRate() {
    return fetch(
        bitsplitURL + "/bitcoin/exchangerate", {
            method: 'GET',
        }
    ).then((result) => {
        return result;
    }).then((resultJson) => {
        return resultJson.json();
    }).catch(error => {
        console.log(error);
        alert("THERE WAS AN ERROR");
    })
}
