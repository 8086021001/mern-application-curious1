const {makePayment,makePaymentUsingRazorPay,RazorPaySuccess} = require('../controllers/wallet')
const express = require("express")
const router = express.Router()
const {verifyToken} = require('../controllers/verifyToken')




router .post('/makePayment',makePayment)


router.post('/makePaymentUsingRazorPay',verifyToken,makePaymentUsingRazorPay)


router.post('/RazorPaySuccess',verifyToken,RazorPaySuccess)




module.exports = router
