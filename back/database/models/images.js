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
      type: DataTypes.TEXT,
      allowNull: true
    },
    providers_idproviders: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    
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
          { name: "providers_idproviders" },
        ]
      },
      {
        name: "fk_images_likes1_idx",
        using: "BTREE",
        fields: [
          { name: "likes_idlikes" },
          { name: "likes_comments_idcomments" },
        ]
      },
    ]
  });
};
