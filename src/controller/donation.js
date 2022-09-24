
const { v4: uuidv4 } = require('uuid');
const ID = require("nodejs-unique-numeric-id-generator");
const fs = require('fs');
const path = require('path');
const { createMessage, encrypt, readKey } = require('openpgp');
const axios = require('axios');
var gg = '';

var userID = '';
let yourID = '';
var name = "";
var surName = "";
var middleName = "";



const home = async (req, res, next) => {

  res.json("Ayo Solomon,Chinwendu Iheanetu,Micheal Oladipopo presents Sopa-Ereto first place winner at Hack The Mara"
  );
}


const createCryptoDonation = async (req, res, next) => {

  const options = {
    method: 'POST',
    url: 'https://api-sandbox.circle.com/v1/paymentIntents',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
    },
    data: {
      amount: { currency: 'BTC', amount: '3.14' },
      amountPaid: { currency: 'USD' },
      paymentMethods: [{ type: 'blockchain', chain: 'BTC' }],
      idempotencyKey: `${uuidv4()}`,
      settlementCurrency: 'USD'
    }
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


}


const recieveCryptoDonation = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api-sandbox.circle.com/v1/paymentIntents/23795c43-7762-4433-bc3c-cea4db1ba9b3',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

};


const recieveCardDonation = async (req, res, next) => {


  const options = {
    method: 'POST',
    url: 'https://api-sandbox.circle.com/v1/payments',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer QVBJX0tFWTpkZTJlM2ZiOWJlNjkzMWZkZGZhZTBmYjk3YjJiY2NmZDpmNzEyOWY4NzgwZDczMzRiMDI4YTgyYjQxMjI2NDIwYQ'
    },
    data: {
      metadata: {
        sessionId: 'DE6FA86F60BB47B379307F851E238617',
        ipAddress: '244.28.239.130',
        email: 'ayoseunsolomon@gmail.com',
        phoneNumber: '+14155555555'
      },
      amount: { currency: 'USD', amount: '3.14' },
      autoCapture: true,
      source: { id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card' },
      encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
      description: 'Payment',
      verification: 'three_d_secure',
      idempotencyKey: `${uuidv4()}`,
      keyId: 'key1',
      verificationSuccessUrl: 'https://sopa-ereto.vercel.app/donor/success',
      verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure'
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

};




const sendPay = async (req, res, next) => {
  const options = {
    method: 'POST',
    url: 'https://api-sandbox.circle.com/v1/paymentIntents',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer QVBJX0tFWTowMTZjODUzMzhjOGM2Mzc1YzZhNDU5YWY3YWNhNTZiYjpmZDNlZDUzZjk2YjExOTNlZGIxYmZjMDYyNjNmZDg4Ng=='
    },
    data: JSON.stringify({
      source: { type: 'wallet', id: '12345' },
      destination: {
        type: 'blockchain',
        address: '3C9Q',
        addressTag: '123456789',
        chain: 'BTC'
      },
      paymentMethods: [{ type: 'blockchain', chain: 'BTC' }],
      settlementCurrency: 'USD',
      amount: { amount: '3.14', currency: 'BTC' },
      idempotencyKey: `${uuidv4()}`,
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
  sendPay,
  recieveCardDonation,
  recieveCryptoDonation

};







