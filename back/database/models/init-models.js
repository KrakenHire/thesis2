var DataTypes = require("sequelize").DataTypes;
var _booking = require("./booking");
var _bookmarks = require("./bookmarks");
var _images = require("./images");
var _likes = require("./likes");
var _providers = require("./providers");
var _rating = require("./rating");
var _reviews = require("./reviews");
var _users = require("./users");

function initModels(sequelize) {
  var booking = _booking(sequelize, DataTypes);
  var bookmarks = _bookmarks(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var providers = _providers(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  
  providers.hasMany(images, { foreignKey: "providers_idproviders", hook:true,onDelete: 'CASCADE'});
  images.belongsTo(providers, { foreignKey: "providers_idproviders" });
  booking.belongsTo(providers, {foreignKey: "providers_idproviders"});
  providers.hasMany(booking, { foreignKey: "providers_idproviders",hook:true});
  bookmarks.belongsTo(providers, {foreignKey: "providers_idproviders"});
  providers.hasMany(bookmarks, { foreignKey: "providers_idproviders" ,hook:true,onDelete: 'CASCADE'});
  rating.belongsTo(providers, {foreignKey: "providers_idproviders" ,
  onDelete: 'CASCADE'});
  providers.hasMany(rating, {foreignKey: "providers_idproviders",
  onDelete: 'CASCADE'});
  reviews.belongsTo(providers, {foreignKey: "providers_idproviders"});
  providers.hasMany(reviews, { foreignKey: "providers_idproviders"});
  likes.belongsTo(reviews, { foreignKey: "reviews_idreview"});
  reviews.hasMany(likes, {foreignKey: "reviews_idreview"});
  booking.belongsTo(users, {foreignKey: "users_iduser"});
  users.hasMany(booking, { foreignKey: "users_iduser"});
  bookmarks.belongsTo(users, { foreignKey: "users_iduser"});
  users.hasMany(bookmarks, { foreignKey: "users_iduser"});
  likes.belongsTo(users, {foreignKey: "users_iduser"});
  users.hasMany(likes, { foreignKey: "users_iduser"});
  rating.belongsTo(users, { foreignKey: "users_iduser", onUpdate: 'CASCADE',
  onDelete: 'CASCADE'});
  users.hasMany(rating, { foreignKey: "users_iduser", onUpdate: 'CASCADE',
  onDelete: 'CASCADE'});
  reviews.belongsTo(users, {  foreignKey: "users_iduser"});
  users.hasMany(reviews, { foreignKey: "users_iduser"});

  return {
    booking,
    bookmarks,
    images,
    likes,
    providers,
    rating,
    reviews,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
