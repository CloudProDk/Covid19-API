var sql = require("../db/db");

// Returns all products
exports.get_all_products = function (req, res) {
  // sql query
  const query = "SELECT * FROM product";

  sql.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
};

// Returns product by id
exports.get_product_by_id = function (req, res) {
  const productID = req.params.id;
  // sql query
  const query = "SELECT * FROM product WHERE id = ?";

  sql.query(query, [productID], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }

    res.json(rows);
  });
};

// Add product to products
exports.add_product_to_products = function (req, res) {
  // sql query
  const query = "INSERT INTO product SET ?";

  var product = req.body;

  sql.query(query, [product], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }

    res.send(product);
  });
};

// Delete product
exports.delete_product = function (req, res) {
  console.log("Deleting id: " + req.body.id);

  var product = req.body;

  // sql query
  const query = "DELETE FROM product WHERE id = ?";

  sql.query(query, [product.id], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }
    res.send(product);
  });
};
