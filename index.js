const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NoldTDDu6fhloMsQD2x290XdYni1UMfUJ2yaDWvL5y720pFNXyKdnBs7VF8vzMcU4T09bu7GbOvoeDpmMuZgrY600BFYibXGk');
// This is your test secret API key.
const app = express();
app.use(cors())
app.use(express.static(__dirname));
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
// const path = require('path');
const YOUR_DOMAIN = 'http://localhost:5173';



app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1NosC7DDu6fhloMs86DTj3hX',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/success?success=true`,
        cancel_url: `http://localhost:5173/error?canceled=true`,
    });

    res.redirect(303, session.url);
});
app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})
app.listen(3005, () => console.log('Running on port 3005'));