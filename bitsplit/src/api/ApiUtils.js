var bitsplitURL = "http://172.20.10.2:8080";

export default function LoginWithUsername(username, password) {



    fetch(bitsplitURL + "/auth/login", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
            "username": "123",
            "password": "12345678"
        } // <-- Post parameters)
        )
    })
        .then((response) => response.json())
        .then((responseText) => {
            if(responseText.status == "error"){
                return responseText;
            }
            //alert(responseText.data.authToken)
            return responseText;
        })
        .catch((error) => {
            console.error(error);
        })

}