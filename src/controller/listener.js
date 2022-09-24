

const donorPaid = (req, res, next) => {

   console.log( req.body)

}

const disbursedPayment = (req, res, next) => {

    console.log( req.body)

}
const disbursedPaymentSMS = (req, res, next) => {

    const data = req.body;
    console.log(`Received message: \n ${JSON.stringify(data) }`);
    res.sendStatus(200);

}

module.exports={
    disbursedPayment,
    disbursedPaymentSMS,
    donorPaid
};