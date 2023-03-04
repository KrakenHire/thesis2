const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    iduser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      defaultValue: ''
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    LastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
   
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "iduser" },
        ]
      },
    ]
  });
};
