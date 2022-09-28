




const cryptoIntent = async (res, req, next) => {



    try {

        await axios({
            method: "post",
            url: 'https://api-sandbox.circle.com/v1/paymentIntents',
            data: {
                amount: { amount: req.body.amountValue, currency: req.body.symboltoUpperCase() },
                amountPaid: { currency: 'USD' },
                paymentMethods: [{ type: 'blockchain', chain:  req.body.symboltoUpperCase()}],
                idempotencyKey: '30d8f3ca-3476-43b7-94e9-09d0f61e9e47',
                settlementCurrency:  req.body.symbol.toUpperCase()
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

module.exports={
    cryptoIntent,
}