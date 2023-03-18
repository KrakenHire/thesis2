const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    iduser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ''
    }, 
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
