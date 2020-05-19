var sql = require("../db/db");

// Return cart by uuid
exports.get_cart_by_uuid = function (req, res) {
  const cartUuid = req.params.uuid;
  //sql query
  const query =
    "SELECT cart.id, cart.uuid FROM cart WHERE cart.uuid = ?";

  sql.query(query, [cartUuid], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
};

// Return cart with card-items with products by uuid
exports.get_cart_with_items_by_uuid = function (req, res) {
  const cartUuid = req.params.uuid;
  //sql query
  const query =
    "SELECT cart.id, cart_item.id as cart_item_id, cart_item.product, product.name,  COUNT(product.name) AS number_of_items, product.price, COUNT(product.name) * product.price AS total_price, product.quantity, product.img_url FROM cart INNER JOIN cart_item ON cart.id = cart_item.cart INNER JOIN product ON cart_item.product = product.id WHERE cart.uuid = ? AND cart_item.product = product.id GROUP BY product.name";
  // "SELECT cart_item.product, product.name, COUNT(product.name) AS number_of_items, product.price, COUNT(product.name) * product.price AS total_price FROM cart INNER JOIN cart_item ON cart.id = cart_item.cart INNER JOIN product ON cart_item.product = product.id WHERE cart.uuid = ? AND cart_item.product = product.id GROUP BY product.name";

  sql.query(query, [cartUuid], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
};

// Add cart-item with product to cart
exports.add_cart_item = function (req, res) {
  var cartID = req.body.cart;
  var productID = req.body.product;

  const query = "INSERT INTO cart_item(cart, product) VALUES(?, ?);";
  const productQuery =
    "UPDATE product SET quantity = quantity - 1 WHERE id = ?";

  sql.query(query, [cartID, productID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
    res.send(req.body);
  });
  sql.query(productQuery, [productID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
  });
};

// Add cart
exports.add_cart = function (req, res) {
  var uuid = req.body.uuid;
  // sql query
  const query = "INSERT INTO cart(uuid) VALUES (?);";

  sql.query(query, [uuid], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
    res.send(req.body);
  });
};

// Delete cart_item
exports.delete_cart_item = function (req, res) {
  var cartItemID = req.params.cart_item_id;
  var productID = req.params.cart_item_product;
  // sql query
  const query = "DELETE FROM cart_item WHERE id = ?;";

  const productQuery =
    "UPDATE product SET quantity = quantity + 1 WHERE id = ?;";
  sql.query(query, [cartItemID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
  sql.query(productQuery, [productID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
  });
};
