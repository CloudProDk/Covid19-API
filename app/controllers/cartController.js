var sql = require("../db/db");

// Return cart by uuid
exports.get_cart_by_uuid = function (req, res) {
  const cartUuid = req.params.uuid;
  //sql query
  const query =
    "SELECT cart.id, cart.uuid, cart.total_price FROM cart WHERE cart.uuid = ?";

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
    "SELECT cart.id, cart.total_price, cart_item.id as cart_item_id, cart_item.product, product.name, product.price, product.quantity, product.img_url FROM cart INNER JOIN cart_item ON cart.id = cart_item.cart INNER JOIN product ON cart_item.product = product.id WHERE cart.uuid = ? AND cart_item.product = product.id";

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

  sql.query(query, [cartID, productID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
    res.send(req.body);
  });
};

// Add cart
exports.add_cart = function (req, res) {
  var uuid = req.body.uuid;
  var totalPrice = 1000;
  // sql query
  const query = "INSERT INTO cart(uuid, total_price) VALUES (?, ?);";

  sql.query(query, [uuid, totalPrice], (err, rows, fields) => {
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
  // sql query
  const query = "DELETE FROM cart_item WHERE id = ?";
  sql.query(query, [cartItemID], (err, rows, fields) => {
    if (err) {
      console.log("Error " + err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
};
