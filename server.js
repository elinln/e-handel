require('dotenv').config('.env');

const secretKey = process.env.STRIPE_SECRET_KEY;
const express = require('express');
const stripe = require('stripe')(secretKey);

const jsonDB = {
    //"payment_id": sessionObjec
};

const app = express();
app.use('/api', express.json())

app.use(express.static('public'))

app.get("/api/admin/purchases", async (req,res) => {

    res.status(200).json(jsonDB);
});


app.post("/api/session/new", async (req, res) => {
    let products = req.body.products;
    let perfumesToStripe = [];

    products.forEach((product) => {
        let line_item = {
            description: product.description,
            price_data: {
                currency: "sek",
                product_data: {
                    name: product.title,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity || 1,
        }
        perfumesToStripe.push(line_item);
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: perfumesToStripe,
        mode: "payment",
        success_url: "http://localhost:3000/success_checkout.html",
        cancel_url: "http://localhost:3000/canceled_checkout.html"
    });
    res.status(200).json({ id: session.id })
    
});

app.post("/api/session/verify", async (req, res) => {
    const sessionId = req.body.sessionId;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status == "paid") {
        //Spara lämplig information i JSON
        const key = session.payment_intent;
        if (!jsonDB[key]) {
            jsonDB[key] = session;
        }
        res.status(200).json({ paid: true });
    } else {
        res.status(200).json({ paid: false });
    }

    console.log(session);
});


app.listen(3000, () => {
    console.log("server is running!");
});


