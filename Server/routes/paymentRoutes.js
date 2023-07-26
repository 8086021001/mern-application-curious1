const {makePayment,makePaymentUsingRazorPay,RazorPaySuccess} = require('../controllers/wallet')
const express = require("express")
const router = express.Router()
const {verifyToken} = require('../controllers/verifyToken')




router .post('/makePayment',makePayment)


router.post('/makePaymentUsingRazorPay',makePaymentUsingRazorPay)


router.post('/RazorPaySuccess',RazorPaySuccess)




module.exports = router
