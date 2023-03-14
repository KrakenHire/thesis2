const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    idreview: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    users_iduser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      field: 'updated_at'
    }
    ,
    providers_idproviders: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'providers',
        key: 'idproviders'
      }
    },
  
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: true,
    indexes: [
     

      {
        name: "fk_comments_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_iduser" },
        ]
      },
      {
        name: "fk_reviews_providers1_idx",
        using: "BTREE",
        fields: [
          { name: "providers_idproviders" },
        ]
      },
    ]
  });
};
