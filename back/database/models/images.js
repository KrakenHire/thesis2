const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    idimages: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    posts_idposts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'idposts'
      }
    }
  }, {
    sequelize,
    tableName: 'images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idimages" },
        ]
      },
      {
        name: "fk_images_posts1_idx",
        using: "BTREE",
        fields: [
          { name: "posts_idposts" },
        ]
      },
    ]
  });
};
