import Sequelize from "sequelize";
import { DB_BI } from "../config/database-bi";
export const sequelizeBi = new Sequelize(
  DB_BI.database,
  DB_BI.user,
  DB_BI.password,
  {
    host: DB_BI.host,
    dialect: "postgres",

    dialectOptions: {
      application_name: "My Node App",
    },
    pool: {
      max: 50,
      min: 0,
      require: 30000,
      idle: 10000,
      setTimeout: 10000,
    },
    logging: (m) => console.log(m),
  }
);
