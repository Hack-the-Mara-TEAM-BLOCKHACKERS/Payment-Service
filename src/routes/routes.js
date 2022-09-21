const express=require('express');
const router=express.Router();
const payment=require('../controller/donation')
const webhookListener=require('../controller/listener')
const disburse=require('../controller/disbursement')
var bodyParser = require('body-parser')

 
// create application/json parser
var jsonParser = bodyParser.json()


router.post('/',payment.home);

//donor sends
router.get('/donorPay',jsonParser,payment.donorPay);

router.post('/recievePay',jsonParser,payment.recieveCircle);
router.post('/sendPay',jsonParser,payment.sendPay);
//disburse to all users
router.post('/disburse',jsonParser,disburse.disbursedPay);


//webhooks
router.post('/donorWebhook',jsonParser,webhookListener.donorPaid);
router.post('/disbursedWebhook',jsonParser,webhookListener.disbursedPayment);


module.exports=router;