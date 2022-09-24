const { v4: uuidv4 } = require('uuid');
const ID = require("nodejs-unique-numeric-id-generator");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');
const { arrayify } = require('ethers/lib/utils');
const privateKey = fs.readFileSync(path.join(__dirname, '../auth/private-key.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../auth/public-key.pem'), 'utf8');





const disbursedPay = async (req, res, next) => {
    const payload = { 'provider': 'MPESA-B2C', 'currency': 'KES', 'callback_url': 'https://263a-105-112-181-175.eu.ngrok.io/disbursedWebhook', 'transactions': [{ 'name': 'test-name', 'account': 254725456456, 'amount': 1300 },{ 'name': 'test-name', 'account': 254723567897, 'amount': 1300 }, { 'name': 'test-name', 'account': 254723870353, 'amount': 1300 }], 'device_id': "PRXXORV" }
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
            // console.log("signature verified: ", isVerified);

            //Convert the signature to base64 for storage.
            // console.log(signature.toString("hex"));

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
                res.send(resp.data);
                console.log(resp.data['transactions'][0]['account'])
                // console.log(resp.data['transactions'][0]['name'])
                //console.log(resp.data['transactions'][0]['amount'])
                // console.log(resp.data['transactions'][0]['transaction_id'])
                // console.log(resp.data['transactions'][0]['created_at'])

                const thisTime = resp.data['transactions'][0]['created_at']
                var startTimeISOString = thisTime;
                var currency = resp.data['transactions'][0]['currency']
                var startTime = new Date(startTimeISOString);
                startTime = new Date(startTime.getTime() + (startTime.getTimezoneOffset()));
                var paidCash = resp.data['transactions'][0]['amount'];
                const allMpesa = resp.data['transactions'];
                const paid = allMpesa.map((num) => '+' + num['account']);
                //const paidCash = allMpesa.map((num) => '+' + num['amount']);
               

                try {
                    //var phone = resp.data['transactions'][0]['account'];
                    //let realPhone = '+'+phone;
                     var arr = '*384*6566*3#'// Create empty array


                    // SIMPLE
                    // arr.push(realPhone.toString());
                    // console.log(arr)
                    axios.post(
                        "http://localhost:3001/sendSMS",

                        data = { "group": paid, "messageBody": `You were paid ${paidCash}KSH at ${startTime} by the conservancy. You will get a credit alert shortly. You can dial ${arr} or visit https://sopa-ereto.vercel.app/transaction to get real-time information on how the fund was disbursed` },
                        {
                            headers: {
                                "Content-type": "application/json",

                            }
                        }
                    ).then((resp) => {
                        res.send(resp.data);


                    })

                } catch (error) {

                }


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

