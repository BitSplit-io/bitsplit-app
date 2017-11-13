var bitsplitURL = "http://192.168.0.11:8080";

export default function LoginWithUsername(username, password) {

    return fetch(bitsplitURL + "/auth/login", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
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