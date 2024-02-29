const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MONGODB_URL, PORT, SECRET } = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: ["https://vercel.com/lehibonafes-projects/e-commerce-app-server"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const userRoute = require("./Routes/UserRoutes");
app.use("/user", userRoute);

const productRoute = require("./Routes/ProductsRoutes");
app.use("/products", productRoute);

const cartRoute = require("./Routes/CartRoutes");
app.use("/cart", cartRoute);

const orderRoute = require("./Routes/OrderRoute");
app.use("/orders", orderRoute);

module.exports = app;
