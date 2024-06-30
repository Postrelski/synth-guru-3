const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OjQ0pLgfwAAD6ezr9qDS1UumAoGSHVBEzmq4gWl0QpDqtnw7Ao7ZIkVgx2ARLlWQwzgg9J92wCUnIU6zFdXXANG00OHFfHB6H"
);
const path = require("path");

const app = express();

// CORS Configuration
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://calm-caverns-34597-37cce735fe7d.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    console.log("here is the callback: " + callback);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Serve static files
app.use(express.static("public"));

// Parse JSON bodies
app.use(express.json());

// Route for handling checkout
app.post("/checkout", async (req, res, next) => {
  try {
    const items = req.body.items;
    const lineItems = items.map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Catch-all route for GET requests
app.get("*", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen();
