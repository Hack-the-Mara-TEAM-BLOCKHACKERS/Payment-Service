
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const memcrypt = require('../../auth/encrypt');


const getPubKey = async (req, res, next) => {


    let newKey = '';
    try {
        await axios.get(
            'https://api-sandbox.circle.com/v1/encryption/public',
            {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
                }
            }
        ).then(async (response) => {

            //console.log( response.data['data']['keyId']);
            res.send(response.data['data']);
            // data=  await memcrypt(response.data['data']['keyId'], response.data['data']['publicKey'],number,cvv);
            // res.send(data);
        })

    } catch (error) {

    }

};




const createCard = async (req, res, next) => {
    var mData = await memcrypt(req.body.id, req.body.publicKey, req.body.number, req.body.cvv);
    try {

        await axios({
            method: "post",
            url: `https://api-sandbox.circle.com/v1/cards`,
            data: {
                billingDetails: {
                    city: 'Boston',
                    name: 'Satoshi Nakamoto',
                    line1: '100 Money Street',
                    country: 'US',
                    postalCode: '01234',
                    line2: 'Suite 1',
                    district: 'MA'
                },
                metadata: {
                    phoneNumber: '+14155555555',
                    email: 'satoshi@circle.com',
                    sessionId: 'DE6FA86F60BB47B379307F851E238617',
                    ipAddress: '244.28.239.130'
                },
                encryptedData: mData['encryptedMessage'],
                //encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
                keyId: mData['keyId'],
                //keyId: 'key1',
                idempotencyKey: `${uuidv4()}`,
                expMonth: req.body.month,
                expYear: req.body.year
            },
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
            },
        }).then((response) => {

            res.send(response.data);


        })

    } catch (error) {
        console.log(error);
    }












}


module.exports = {
    getPubKey,
    createCard
}