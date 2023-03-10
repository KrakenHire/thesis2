const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('providers', {
    idproviders: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    service: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    age: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 0
    },
    experience: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    sequelize,
    tableName: 'providers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproviders" },
        ]
      },
    ]
  });
};
