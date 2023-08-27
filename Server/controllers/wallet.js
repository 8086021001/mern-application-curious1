
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const UserSchema = require('../models/userSchema')





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
        let amt = req?.body?.details
        let userId = req?.id
        let amountPaid = amt * 100

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

       const options = {
            amount: amountPaid,
            currency: "INR",
            receipt: "receipt_order_7439"
        };
        const usrDetails = await UserSchema.findById(userId)

        const useData = {
            usrName:usrDetails?.name,
            usrPhone:usrDetails?.phone,
            usrEmail:usrDetails?.email
        }
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json({order,useData});
    } catch (error) {
        res.status(500).send(error);
    }
}


const RazorPaySuccess = async(req,res)=>{
    try {
        const userId = req.id

        
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            amount
        } = req?.body?.data;

        const usrDetails = await UserSchema.findByIdAndUpdate(userId,{ $inc: { wallet: amount } },{ new: true } )


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