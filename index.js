const express = require("express");
require("dotenv").config();
const HOST = "0.0.0.0";

const app = express();
const productRouter = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://hanee:${process.env.SECRET_KEY}@nestcluster.mfklpdz.mongodb.net/tdd?retryWrites=true&w=majority`,

    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/products", (req, res) => {
  console.log("req.body:", req.body);
});

app.listen(8050, HOST);
console.log(`Running on http://${HOST}:${8050}`);
