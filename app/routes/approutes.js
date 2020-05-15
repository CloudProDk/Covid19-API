module.exports = function (app) {
  // var wishlist = require("../controllers/wishListController");
  var quiz = require("../controllers/quizController");
  var shop = require("../controllers/shopController");
  var cart = require("../controllers/cartController");

  // Quiz
  app
    .route("/quiz")
    .get(quiz.get_all_highscores)
    .post(quiz.add_score_to_highscores);

  // Shop
  app
    .route("/shop")
    .get(shop.get_all_products)
    .post(shop.add_product_to_products)
    .delete(shop.delete_product);
  app.route("/shop/addCart").post(cart.add_cart);
  app.route("/shop/addCartItem").post(cart.add_cart_item);
  app.route("/cart/:uuid").get(cart.get_cart_by_uuid);
  app.route("/shop/cart/:uuid").get(cart.get_cart_with_items_by_uuid);
  app.route("/shop/cart/:cart_item_id").delete(cart.delete_cart_item);

  // Wishlist
  // app.route('/wish')
  //   .get(wishlist.get_all_wishlists)
  //   .post(wishlist.add_wish_to_wishlist)
  //   .put(wishlist.update_wish)
  //   .delete(wishlist.delete_wish);

  // app.route('/wish/id/:id')
  //   .get(wishlist.get_wishlist_by_id);

  // app.route('/wish/user/:id')
  //   .get(wishlist.get_wishlist_by_user_id);

  // app.route('/wish/delete/:movieId/:userId')
  //   .put(wishlist.edit_wish)
  //   .delete(wishlist.delete_wish_by_movie_id);
};
