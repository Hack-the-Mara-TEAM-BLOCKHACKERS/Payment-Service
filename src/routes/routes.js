const express=require('express');
const router=express.Router();
const payment=require('../controller/donation')
const webhookListener=require('../controller/listener')
const disburse=require('../controller/disbursement')
const card=require('../controller/card')
var bodyParser = require('body-parser')

 
// create application/json parser
var jsonParser = bodyParser.json()


router.post('/',payment.home);

//donor sends
router.get('/donorPayCard',jsonParser,payment.recieveCardDonation);
router.get('/donorPayCrypto',jsonParser,payment.recieveCardDonation);
router.post('/sendPay',jsonParser,payment.sendPay);
//disburse to all users
router.post('/disburse',jsonParser,disburse.disbursedPay);
router.get('/key',jsonParser,card.getPubKey);
router.post('/createCard',jsonParser,card.createCard);

//webhooks
router.post('/donorWebhook',jsonParser,webhookListener.donorPaid);
router.post('/disbursedWebhook',jsonParser,webhookListener.disbursedPayment);


module.exports=router;