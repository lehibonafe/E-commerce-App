const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MONGODB_URL, PORT } = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userRoute = require("./Routes/UserRoutes");
app.use("/user", userRoute);

const productRoute = require("./Routes/ProductsRoutes");
app.use("/products", productRoute);

const cartRoute = require("./Routes/CartRoutes");
app.use("/cart", cartRoute);

const orderRoute = require("./Routes/OrderRoute");
app.use("/orders", orderRoute);
