var sql = require("../db/db");

// Returns all highscores
exports.get_all_highscores = function (req, res) {
  // sql query
  const query = "SELECT * FROM high_score";

  sql.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
};

// Add score to highscores
exports.add_score_to_highscores = function (req, res) {
  // sql query
  const query = "INSERT INTO high_score(score) VALUES(?)";

  var score = req.body.score;

  sql.query(query, [score], (err, rows, fields) => {
    if (err) {
      console.log("Error: " + err);
      res.sendStatus(500);
      return;
    }

    res.send(req.body);
  });
};
