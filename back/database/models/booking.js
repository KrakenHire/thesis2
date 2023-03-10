const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking', {
    idbooking: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending','confirmed','cancelled'),
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
    providers_idproviders: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'providers',
        key: 'idproviders'
      }
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    workingHours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idbooking" },
        ]
      },
      {
        name: "fk_booking_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_iduser" },
        ]
      },
      {
        name: "fk_booking_providers1_idx",
        using: "BTREE",
        fields: [
          { name: "providers_idproviders" },
        ]
      },
    ]
  });
};
