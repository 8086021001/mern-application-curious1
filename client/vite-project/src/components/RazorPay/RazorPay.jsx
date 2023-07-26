import React from 'react'
import axiosInstance from '../../baseAPI/axiosBaseURL';

const RazorPay = () => {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axiosInstance.post("http://localhost:5000/user/makePaymentUsingRazorPay");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Anooppppp .",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axiosInstance.post("http://localhost:5000/user/RazorPaySuccess", data);

                alert(result.data.msg);
            },
            prefill: {
                name: " Anooppp",
                email: "Bot@example.com",
                contact: "9999999999",
            },
            notes: {
                address: " Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return (
        <>
            <button className="App-link" onClick={displayRazorpay}>
                Razor Pay
            </button>
        </>
    )
}

export default RazorPay