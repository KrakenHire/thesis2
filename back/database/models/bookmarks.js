const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookmarks', {
    providers_idproviders: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'providers',
        key: 'idproviders'
      }
    },
    users_iduser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'bookmarks',
    timestamps: false,
    indexes: [
      {
        name: "fk_followers_providers1_idx",
        using: "BTREE",
        fields: [
          { name: "providers_idproviders" },
        ]
      },
      {
        name: "fk_bookmarks_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_iduser" },
        ]
      },
    ]
  });
};
