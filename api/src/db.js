require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/changapp`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Category, Services, Request, Reviews, Notifications } =
  sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Services, { as: "services", foreignKey: "user_id" });
Services.belongsTo(User, { as: "user", foreignKey: "user_id" });

Category.hasMany(Services, { as: "services", foreignKey: "category_id" });
Services.belongsTo(Category, { as: "category", foreignKey: "category_id" });

Services.hasMany(Request, { as: "request", foreignKey: "service_id" });
Request.belongsTo(Services, { as: "services", foreignKey: "service_id" });

User.hasMany(Reviews, { as: "reviews", foreignKey: "user_id" });
Reviews.belongsTo(User, { as: "user", foreignKey: "user_id" });

User.hasMany(Reviews, { as: "reviewer", foreignKey: "author_id" });
Reviews.belongsTo(User, { as: "author", foreignKey: "author_id" });

User.hasMany(Request, { as: "requester", foreignKey: "requester_id" });
Request.belongsTo(User, { as: "userRequester", foreignKey: "requester_id" });

User.hasMany(Notifications, {
  as: "notification",
  foreignKey: "userNotification_id",
});
Notifications.belongsTo(User, {
  as: "userNotification",
  foreignKey: "userNotification_id",
});

User.hasMany(Notifications, {
  as: "notificated",
  foreignKey: "userNotificated_id",
});
Notifications.belongsTo(User, {
  as: "userNotificated",
  foreignKey: "userNotificated_id",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
