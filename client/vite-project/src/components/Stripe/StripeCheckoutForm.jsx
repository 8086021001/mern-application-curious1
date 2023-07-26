// import React, { useState } from 'react'
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axiosInstance from '../../baseAPI/axiosBaseURL';




// const StripeCheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(CardElement),
//         });

//         if (!error) {
//             console.log("Stripe 23 | token generated!", paymentMethod);
//             try {
//                 const { id } = paymentMethod;
//                 const response = await axiosInstance.post("user/makePayment", {
//                     amount: 999,
//                     currency: 'inr',
//                     id: id,
//                 })


//                 console.log("Stripe 35 | data", response.data.success);
//                 if (response.data.success) {
//                     console.log("CheckoutForm.js 25 | payment successful!");
//                 }
//             } catch (error) {
//                 console.log("CheckoutForm.js 28 | ", error);
//             }
//         } else {
//             console.log(error.message);
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
//                 {/* The CardElement component is Stripe's pre-built UI for securely collecting card details */}
//                 <CardElement options={{
//                     style: {
//                         base: {
//                             fontSize: "16px",
//                             fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                             "::placeholder": {
//                                 color: "#aab7c4",
//                             },
//                         },
//                         invalid: {
//                             color: "#fa755a",
//                         },
//                     },
//                 }} />

//                 <button type="submit" style={{ marginTop: "10px" }}>Pay</button>
//             </form>

//         </>
//     );
// }

// export default StripeCheckoutForm