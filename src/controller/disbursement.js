const { v4: uuidv4 } = require('uuid');
const ID = require("nodejs-unique-numeric-id-generator");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, '../auth/private-key.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../auth/public-key.pem'), 'utf8');





const disbursedPay = async (req, res, next) => {
    const payload = { 'provider': 'MPESA-B2C', 'currency': 'KES', 'callback_url': 'https://263a-105-112-181-175.eu.ngrok.io/disbursedWebhook', 'transactions': [{ 'name': 'test-name', 'account': 254723890353, 'amount': 10 }], 'device_id': "PRXXORV" }
    let latestResponse = {}
    var token = 'ISSecretKey_test_0aefd410-da30-4a35-ab47-4335e9a35f69';
    try {
        await axios.post(
            "https://sandbox.intasend.com/api/v1/send-money/initiate/",
            payload,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((response) => {
            // console.log(response.data['nonce'])
            let nonce = response.data['nonce'];

            const signature = require("crypto").sign("sha256", Buffer.from(nonce),
                {
                    key: privateKey
                   // padding: require("crypto").constants.RSA_PKCS1_PSS_PADDING,
                });

            const isVerified = require("crypto").verify(
                "sha256",
                Buffer.from(nonce),
                {
                    key: publicKey
                   // padding: require("crypto").constants.RSA_PKCS1_PSS_PADDING,
                },
                Buffer.from(signature.toString("hex"), "hex")
            );

            // isVerified should be `true` if the signature is valid
            console.log("signature verified: ", isVerified);

            //Convert the signature to base64 for storage.
            console.log(signature.toString("hex"));

            let newNonce = signature.toString("hex");
            response.data['nonce'] = newNonce;
            latestResponse = response.data;
        });
       // console.log(latestResponse)
        try {
           await axios.post(
                "https://sandbox.intasend.com/api/v1/send-money/approve/",
                latestResponse,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then((resp) => {
                console.log(resp.data);

            })
        } catch (error) {
            
            console.log(error.response.data);
            

        }



    } catch (error) {

    }


};







module.exports = {
    disbursedPay

};

