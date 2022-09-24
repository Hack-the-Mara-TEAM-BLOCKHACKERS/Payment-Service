const express = require("express");
const  routes  = require("./routes/routes");
const cors = require('cors');
const xss = require('xss-clean')
const bodyParser = require('body-parser');
const app=express();




app.use(cors());
app.use(xss())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"60mb"}));
app.use(express.json());
app.use('/mcs3',routes)





const listener=app.listen(process.env.PORT||3002,()=>{
    console.log("Payment app is running on "+listener.address().port);
})