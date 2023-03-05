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
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    lastName: {
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
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'providers',
    timestamps: false,
    indexes: [   //Indexes are used to improve the performance of database queries by allowing the database to quickly locate rows based on the values of one or more columns.
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE", //the idproviders column should be unique and indexed using a B-tree data structure.
        fields: [
          { name: "idproviders" },
        ]
      },
    ]
  });
};
