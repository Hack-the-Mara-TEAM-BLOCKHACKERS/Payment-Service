

const axios = require('axios');
const memcrypt= require('../auth/encrypt');



let data={
'key':'',
'dataen':''
}
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
            
          data=  await memcrypt(response.data['data']['keyId'], response.data['data']['publicKey']);
         res.send(data);
        })

    } catch (error) {

    }

};




const createCard = async (req, res, next) => {



    const options = {
      method: 'POST',
      url: 'https://api-sandbox.circle.com/v1/cards',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
      },
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
        encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
        keyId: 'key1',
        idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
        expMonth: 1,
        expYear: 2020
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        res.send(response.data)
        //console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

}



module.exports = {
    getPubKey,
    createCard
}