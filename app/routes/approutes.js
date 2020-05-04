module.exports = function (app) {
  var wishlist = require('../controllers/wishListController')

  // Wishlist
  app.route('/wish')
    .get(wishlist.get_all_wishlists)
    .post(wishlist.add_wish_to_wishlist)
    .put(wishlist.update_wish)
    .delete(wishlist.delete_wish);

  app.route('/wish/id/:id')
    .get(wishlist.get_wishlist_by_id);

  app.route('/wish/user/:id')
    .get(wishlist.get_wishlist_by_user_id);

  
  app.route('/wish/delete/:movieId/:userId')
    .put(wishlist.edit_wish)
    .delete(wishlist.delete_wish_by_movie_id);
}
