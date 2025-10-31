const express = require("express");
const app = express();
const mongoose = require("mongoose");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log(err);
  });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

app.get("/", (req, res) => {
  res.send("HI I am root");
});
