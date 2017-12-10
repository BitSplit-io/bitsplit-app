var bitsplitURL = "http://172.20.10.2:8080";
var Auth_Headers = null;


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
            return responseJson;
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })

}

export function Logout(username, userId) {
    return fetch(bitsplitURL + "/auth/login", {
        method: 'POST',
        headers: new Headers({
            Auth_Headers
        }),
        body: JSON.stringify({
            "username": username,
            "password": password,
        } // <-- Post parameters)
        )
    }).then(Auth_Headers = null);
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
            alert("THERE WAS A NETWORK ERROR");
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

export function DoTransaction(poolPassword, poolId) {
    var headers = Object.assign({}, Auth_Headers)
    headers["Content-Type"] = "application/json" 
    return fetch(bitsplitURL + "/pools/"+ poolId +"/transact", {
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
