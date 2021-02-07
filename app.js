const express = require("express");

const app = express();
let products = require("./products");

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products", (req, res) => {
  console.log("", req.params);
  res.json(products);
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product !== foundProduct);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  console.log(req.body);

  req.body.id = products[products.length - 1].id + 1;
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});
app.listen(8000);
