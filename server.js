require('dotenv').config('.env');

const secretKey = process.env.STRIPE_SECRET_KEY;
const express = require('express');
const stripe = require('stripe')(secretKey);

const app = express();

app.get('/api', (req, res) => {
    res.status(200).send("helloooo");
})

app.use(express.static('public'))


app.post("/api/session/new", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                description: "en god parfym",
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "parfym"
                    },
                    unit_amount: 129900
                },
                quantity: 1
            }, {
                description: "en TILL god parfym",
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "en grej"
                    },
                    unit_amount: 299900
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success_checkout.html",
        cancel_url: "http://localhost:3000/index.html"
    });
    res.status(200).json({ id: session.id })
})



app.listen(3000, () => {
    console.log("server is running!");
})