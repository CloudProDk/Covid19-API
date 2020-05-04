var sql = require('../db/db');

// Returns all wishlists
exports.get_all_wishlists = function (req, res) {
    // sql query
    const query = "SELECT * FROM wishlist"
    
    sql.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
}

// Returns wishlist by id
exports.get_wishlist_by_id = function (req, res) {
    // Request parameter = the id from the the route: /wish/:3
    const wishlistID = req.params.id

    // sql query
    const query = "SELECT * FROM wishlist WHERE id = ?"

    sql.query(query, [wishlistID], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }

        res.json(rows)

    })
}

// Returns wishlist by user_id
exports.get_wishlist_by_user_id = function (req, res) {
    // Request parameter = the id from the the route: /wish/user/:3
    const wishlistID = req.params.id

    // sql query
    const query = "SELECT * FROM wishlist WHERE user_id = ?"

    sql.query(query, [wishlistID], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }

        res.json(rows)

    })
}

// Add wish to wishlist
exports.add_wish_to_wishlist = function (req, res) {

    // sql query
    const query = "INSERT INTO wishlist SET ?"

    var wish = req.body

    sql.query(query, [wish], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }

        res.send(wish)
    })
}

// Update wish 
exports.update_wish = function (req, res) {
    console.log('Updating wish with id: ' + req.body.id)

    var wish = req.body
    var id = req.body.id

    // sql query
    const query = "UPDATE wishlist SET movie_id = ? WHERE id = ?"

    sql.query(query, [wish.movie_id, id], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }
        res.send(wish)
    })
}

// Edit wish 
exports.edit_wish = function (req, res) {

    var movie = req.params.movieId
    var user = req.params.userId
    var string = req.body.wishlist_type

    // sql query
    const query = "UPDATE wishlist SET wishlist_type = ? WHERE user_id = ? AND movie_id = ?"

    sql.query(query, [string, user, movie], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }
        res.sendStatus(200)
    })
}

// Delete wish 
exports.delete_wish = function (req, res) {
    console.log('Deleting id: ' + req.body.id)

    var wish = req.body

    // sql query
    const query = "DELETE FROM wishlist WHERE id = ? "

    sql.query(query, [wish.id], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }
        res.send(wish)
    })
}

// Delete wish by movieId
exports.delete_wish_by_movie_id = function (req, res) {
    console.log('trying')
    var movie = req.params.movieId
    var user = req.params.userId

    // sql query
    const query = "DELETE FROM wishlist WHERE user_id = ? AND movie_id = ?"

    sql.query(query, [user, movie], (err, rows, fields) => {
        if (err) {
            console.log('Error: ' + err)
            res.sendStatus(500)
            return
        }
        res.sendStatus(200)
    })
}
