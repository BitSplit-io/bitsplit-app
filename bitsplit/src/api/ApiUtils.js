var bitsplitURL = "http://172.20.10.2:8080";
var Auth_Headers = null;

export function Logout() {
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
                    "User-Id": responseJson.data.userId,
                    "test": "test"
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


export function GetUserPools() {
    return fetch(bitsplitURL + "/users/" + Auth_Headers["User-Id"]  + "/pools", {

        method: 'GET',
        headers: new Headers(
            Auth_Headers
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

export function CreateNewPool(poolName, poolAdmin, poolPassword, poolMember, poolTransactionFee, poolAutomization) {

    return fetch(bitsplitURL + "/pools/create", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
            Auth_Headers,
        }),
        body: JSON.stringify({
            "poolName": poolName,
            "poolAdmin": poolAdmin,
            "poolPassword": poolPassword,
            "poolMember": poolMember,
            "poolTransactionFee": poolTransactionFee,
            "poolAutomization": poolAutomization,
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

export function GetPool(poolId) {

    return fetch(bitsplitURL + "/pools/" + poolId, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
            Auth_Headers,
        }),
    })
        .then(response => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
            alert("THERE WAS A NETWORK ERROR");
        })
}