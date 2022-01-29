const express = require('express');
const app = express();
const path = require('path');
const Razorpay = require('Razorpay');
const router = express.Router();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/order', async(req, res) => {

   try {

    const amount = req.body.amount;
    var instance = new Razorpay({ key_id: 'rzp_test_PETQIG2lgsnZU5', key_secret: 'B43wCmjMsoQmr2fxpgFFMgIH' })

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
      }


   const myOrder = await instance.orders.create(options);

   res.status(200).json({
    success : true,   
    amount : amount,
    order : myOrder   
   });
       
   } catch (error) {
      console.log(error); 
   }
   


});



app.listen(4000, ()=> {
    console.log('server running on port 4000...');
})