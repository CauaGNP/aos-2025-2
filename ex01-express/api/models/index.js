import Sequelize from "sequelize";

import pg from "pg";
import getMessageModel from "./message.js";
import getSessionModel from "./session.js";
import getTaskModel from "./task.js";
import getUserModel from "./user.js";

//POSTGRES_URL
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // logging: false, // Disable SQL query logging
  dialectOptions: {
    // Necessary for SSL on NeonDB, Render.com and other providers
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Task : getTaskModel(sequelize, Sequelize),
  Session : getSessionModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
