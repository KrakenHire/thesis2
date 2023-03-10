const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes', {
    idlikes: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    users_iduser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser'
      }
    },
    reviews_idreview: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reviews',
        key: 'idreview'
      }
    }
  }, {
    sequelize,
    tableName: 'likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idlikes" },
          { name: "comments_idcomments" },
        ]
      },
      {
        name: "fk_likes_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_iduser" },
        ]
      },
      {
        name: "fk_likes_reviews1_idx",
        using: "BTREE",
        fields: [
          { name: "reviews_idreview" },
        ]
      },
    ]
  });
};
