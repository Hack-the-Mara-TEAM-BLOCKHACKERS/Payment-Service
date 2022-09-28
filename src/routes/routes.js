const express=require('express');
const router=express.Router();
const payment=require('../controller/donation')
const webhookListener=require('../controller/listener')
const disburse=require('../controller/disbursement/disbursement')
const card=require('../controller/donations/card')
var bodyParser = require('body-parser')

 
// create application/json parser
var jsonParser = bodyParser.json()


router.get('/home',payment.home);


router.get('/donorPayCard',jsonParser,payment.recieveCardDonation);
router.post('/donorPayCrypto',jsonParser,payment.recieveCryptoDonation);
router.post('/swapPay',jsonParser,payment.sendPay);


//disburse to all users
router.post('/disburse',jsonParser,disburse.disbursedPay);
router.get('/disPay',jsonParser,disburse.payAllLandOwners);

//donor sends
router.get('/key',jsonParser,card.getPubKey);
router.post('/createCard',jsonParser,card.createCard);

//webhooks
router.post('/donatedWebhook',jsonParser,webhookListener.donorPaid);
router.post('/disbursedWebhook',jsonParser,webhookListener.disbursedPayment);
router.post('/smsSent',jsonParser,webhookListener.disbursedPaymentSMS);


module.exports=router;