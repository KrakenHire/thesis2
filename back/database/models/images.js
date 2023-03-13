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
    
  }, 
  );
};
