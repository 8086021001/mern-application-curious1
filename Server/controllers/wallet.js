
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');




const Razorpay = require("razorpay");





const makePayment = async(req,res)=>{
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      })
    }
}


const makePaymentUsingRazorPay = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000,
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}


const RazorPaySuccess = async(req,res)=>{
    try {

        console.log("Heyyyyy got success response here",req.body)
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");
        // console.log("shaaaaaasum",shasum)

        // shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        // console.log("shaaa",shasum)


        // const digest = shasum.digest("hex");
        // console.log("shaaaaaasum 22222222222222222",digest,razorpaySignature)

        // // comaparing our digest with the actual signature
        // if (digest !== razorpaySignature)
        //     return res.status(400).json({ msg: "Transaction not legit!" });
  

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = {makePayment,makePaymentUsingRazorPay,RazorPaySuccess}