/* This will handle payments
 */

const express = require("express");

// @desc     To pay using paypal by schools
// @access   Public (school)
const payments = (paypal, req, res) => {
  try {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://easyschool:5000/success",
            "cancel_url": "http://easyschool:5000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "001",
                    "price": "500.00",
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "INR",
                "total": "500.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = payments;
