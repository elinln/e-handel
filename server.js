require('dotenv').config('.env');

const secretKey = process.env.STRIPE_SECRET_KEY;
const express = require('express');
const stripe = require('stripe')(secretKey);
const fs = require("fs")
const jsonDB = {
    //"payment_id": sessionObjec
};

const app = express();
app.use(express.json())

app.get('/api', (req, res) => {
    res.status(200).send("helloooo");
})

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
    const session = await stripe.checkout.sessions.retrieve(
      req.body.session,
      {
        expand: ["line_items"],
      }
    );
  
    if (session.payment_status == "paid") {
      //Spara
      
      
      const key = session.payment_intent;
  
      let raw = fs.readFileSync("orders.json");
      let data = JSON.parse(raw);
      let checkfordouble = data.find((orderdata) => {
        return req.body.session == session.id
      })
      if (checkfordouble) {
        res.json("Denna ordern finns redan")
        return
      }
    
     
      let order = {
        sessionID: req.body.session, 
        totaltprice: session.amount_total
      }
      data.push(order)
      fs.writeFileSync("orders.json", JSON.stringify(data));
      res.json("Det funkar")
  
      /*if (!data[key]) {
        data[key] = {
          sessionId: req.params.sessionId,
          paymentIntent: session.payment_intent,
          date: new Date(),
          totalPrice: session.amount_total,
          currency: session.currency,
          products: session.line_items.data.map(
            ({ id, description, price, amount_total }) => {
              return {
                id: id,
                description: description,
                unit_price: price.unit_amount,
                currency: price.currency,
                totalPrice: amount_total,
              };
            }
          ),
        };
        data.push(data[key]);
        fs.writeFileSync("orders.json", JSON.stringify(data));
      }
      res.status(200).json({ paid: true });*/
    } else {
      res.status(200).json({ paid: false });
    }
  });
  
  app.get("/api/admin/purchases", async (req, res) => {
    let raw = fs.readFileSync("orders.json");
    let data = JSON.parse(raw);
    res.status(200).json(data);
  });
  

/*app.post("/api/session/verify", async (req, res) => {
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
});*/


app.listen(3000, () => {
    console.log("server is running!");
});


