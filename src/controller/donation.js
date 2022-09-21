
const { v4: uuidv4 } = require('uuid');
const ID = require("nodejs-unique-numeric-id-generator");
const fs = require('fs');
const path = require('path');
const{ createMessage, encrypt, readKey }=require('openpgp');
const axios = require('axios');
var gg = '';

var userID = '';
let yourID = '';
var name = "";
var surName = "";
var middleName = "";


let resp='';


 
var CardDetails ={
  number: '',    // required when storing card details
  cvv: 'string '       // required when cardVerification is set to cvv
 }



const home =async (req, res, next) => {

    res.json("Ayo Solomon,Chinwendu Iheanetu,Micheal Oladipopo presents Sopa-Ereto first place winner at Hack The Mara"
    );
}


const donorPay =async (req, res, next) => {


let newKey='';
 try {
  await  axios.get(
        'https://api-sandbox.circle.com/v1/encryption/public',
        {
            headers: {
                accept: 'application/json',
                authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
              }
        }
    ).then(async(response) =>{

     console.log( response.data['data']['keyId']);

      //res.send(response.data);
      //res.send(resp['data']['publicKey'])
   const publicKeyz =await readKey({ armoredKey:  response.data['data']['publicKey']})


    const Message = await createMessage({ text: JSON.stringify(CardDetails) })
    //console.log( response.data['data']['publicKey']);
    const encrypted =await encrypt({
        message:Message, // input as Message object
        encryptionKeys:  response.data['data']['publicKey'],
        format: "armored"
    }).then((ciphertext)=>{
        console.log( ciphertext);
    })
    console.log( encrypted);
   // await look(resp['data']['publicKey'],resp['data']['keyId']);
    
    });
    
    
 } catch (error) {
    
 }




const look = async(pub,keyId)=>{
    var CardDetails ={
        number: '',    // required when storing card details
        cvv: 'string '       // required when cardVerification is set to cvv
       }
    const publicKeyz = await readKey({ armoredKey: pub});

    const Message = await createMessage({ text: JSON.stringify(CardDetails) });
    const encrypted =await encrypt({
        message:Message, // input as Message object
        encryptionKeys: publicKeyz,
        format: "armored"
    }).then((ciphertext)=>{
        console.log( ciphertext);
    })
   
}


  
    
    
     
    
   
    // const options = {
    //   method: 'POST',
    //   url : 'https://api-sandbox.circle.com/v1/cards',
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
    //   },
    //   body: JSON.stringify({
    //     billingDetails: {
    //       name: 'Satoshi Nakamoto',
    //       country: 'US',
    //       city: 'Boston',
    //       line1: '100 Money Street',
    //       postalCode: '01234',
    //       line2: 'Suite 1',
    //       district: 'MA'
    //     },
    //     metadata: {
    //       phoneNumber: '+234805555555',
    //       ipAddress: '244.28.239.130',
    //       sessionId: 'DE6FA86F60BB47B379307F851E238617',
    //       email: 'satoshi@circle.com'
    //     },
    //     expMonth: 1,
    //     expYear: 2020,
    //     encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
    //     idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
    //     keyId: 'key1'
    //   })
    // };
    
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     res.send(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });




    // // Use https://payment.intasend.com/api/v1/checkout/ for live payments
    // let url = "https://sandbox.intasend.com/api/v1/checkout/"
    // let payload = {
    //     public_key: "ISPubKey_test_f80ff471-2c27-4e6c-97d5-02043de26831",

    //     amount: req.body.amount,
    //     currency: "USD",
    //      //currency: req.body.currency,
    //     //email: req.body.email,
    //      email: "NancyAmadi@gmail.com",
    //     // first_name: "Iheanetu",
    //     // last_name: "Chiwendu",
    //     //country: req.body.country,
    //     "redirect_url": "https://sopa-ereto.vercel.app/donor/success",
    // }
    // axios.post(url, payload).then((resp) => {
    //     if (resp.data.url) {
    //      res.json({
    //     status: 'SE200',
    //     data: resp.data
    // });
    //     }
    // })
    
};


const recieveCircle =async (req,res, next) => {

    const options = {
        method: 'POST',
        url: 'https://api-sandbox.circle.com/v1/paymentIntents',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer QVBJX0tFWTowMTZjODUzMzhjOGM2Mzc1YzZhNDU5YWY3YWNhNTZiYjpmZDNlZDUzZjk2YjExOTNlZGIxYmZjMDYyNjNmZDg4Ng=='
        },
      data: JSON.stringify({
        source: {type: 'wallet', id: '12345'},
        destination: {
          type: 'blockchain',
          address: '0x8381470ED67C3802402dbbFa0058E8871F017A6F',
          addressTag: '123456789',
          chain: 'BTC'
        },
        amount: {amount: '3.14', currency: 'USD'},
        idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
      })
    };
    
    axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

        
};




const sendPay =async (req,res, next) => {
     const options = {
        method: 'POST',
        url: 'https://api-sandbox.circle.com/v1/paymentIntents',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer QVBJX0tFWTowMTZjODUzMzhjOGM2Mzc1YzZhNDU5YWY3YWNhNTZiYjpmZDNlZDUzZjk2YjExOTNlZGIxYmZjMDYyNjNmZDg4Ng=='
        },
       data: JSON.stringify({
            source: {type: 'wallet', id: '12345'},
            destination: {
              type: 'blockchain',
              address: '3C9Q',
              addressTag: '123456789',
              chain: 'BTC'
            },
            paymentMethods: [{type: 'blockchain', chain: 'BTC'}],
            settlementCurrency: 'USD',
            amount: {amount: '3.14', currency: 'BTC'},
            idempotencyKey: 'af7c1fe6-d669-414e-b066-e9733f0de7a8'
          })
      };
      
    
    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

  
        
};

module.exports = {
    home,
    donorPay,
    sendPay,
    recieveCircle

};







