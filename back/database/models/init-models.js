var DataTypes = require("sequelize").DataTypes; // the DataTypes object from the Sequelize library, which is used to define the types of columns in the database.
var _booking = require("./booking");
var _comments = require("./comments");
var _followers = require("./followers");
var _images = require("./images");
var _likes = require("./likes");
var _posts = require("./posts");
var _providers = require("./providers");
var _users = require("./users");

function initModels(sequelize) { //This function takes sequelize as a parameter because it needs to use it to define the models and their associations. sequelize is an instance of the Sequelize class, which is the ORM (Object-Relational Mapping) that is used to interact with a SQL database.The models defined in this function represent tables in the database, and Sequelize uses the sequelize instance to connect to the database and define the schema for those tables. 
  var booking = _booking(sequelize, DataTypes); // (sequelize, DataTypes)The reason for using these variables is to be able to define the associations between the models in the next step.
  var comments = _comments(sequelize, DataTypes); //The _comments function likely returns a Sequelize model that defines the structure of the comments table, including its columns, data types, and any constraints or validations on those columns
  var followers = _followers(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var providers = _providers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  providers.belongsToMany(users, {  through: followers, foreignKey: "providers_idproviders" });
  users.belongsToMany(providers, { through: followers, foreignKey: "users_iduser"});
  comments.belongsTo(posts, {  foreignKey: "posts_idposts"});
  posts.hasMany(comments, {  foreignKey: "posts_idposts"});
  images.belongsTo(posts, {  foreignKey: "posts_idposts"});
  posts.hasMany(images, {  foreignKey: "posts_idposts"});
  likes.belongsTo(posts, {  foreignKey: "posts_idposts"});
  posts.hasMany(likes, {  foreignKey: "posts_idposts"});
  booking.belongsTo(providers, {  foreignKey: "providers_idproviders"});
  providers.hasMany(booking, { foreignKey: "providers_idproviders"});
  followers.belongsTo(providers, {  foreignKey: "providers_idproviders"});
  providers.hasMany(followers, {  foreignKey: "providers_idproviders"});
  posts.belongsTo(providers, {  foreignKey: "providers_idproviders"});
  providers.hasMany(posts, {  foreignKey: "providers_idproviders"});
  booking.belongsTo(users, {  foreignKey: "users_iduser"});
  users.hasMany(booking, { foreignKey: "users_iduser"});
  comments.belongsTo(users, {  foreignKey: "users_iduser"});
  users.hasMany(comments, { foreignKey: "users_iduser"});
  followers.belongsTo(users, {  foreignKey: "users_iduser"});
  users.hasMany(followers, { foreignKey: "users_iduser"});
  likes.belongsTo(users, {  foreignKey: "users_iduser"});
  users.hasMany(likes, {  foreignKey: "users_iduser"});
  posts.belongsTo(users, { foreignKey: "Bookmark"});
  users.hasMany(posts, {  foreignKey: "Bookmark"});

  return {
    booking,
    comments,
    followers,
    images,
    likes,
    posts,
    providers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
