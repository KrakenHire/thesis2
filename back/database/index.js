const { Sequelize } = require("sequelize");
const modelinit=require("./models/init-models")
const sequelize = new Sequelize("kraken", "root", "mySql123456@", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});
sequelize
  .authenticate()
  .then((res) => console.log("Connection has been established successfully."))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

 module.exports.modelinit=modelinit(sequelize)
 sequelize.sync()
module.exports = sequelize;

