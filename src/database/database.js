import Sequelize from "sequelize";
import { DB } from "../config/database";
export const sequelize = new Sequelize(
<<<<<<< HEAD
    'gestionf',
    'axeso',
    'axeso@D593*', {
        host: '190.116.51.182',
        dialect: 'postgres',

        dialectOptions: {
            application_name: 'My Node App',
        },
        pool: {
            max: 50,
            min: 0,
            require: 30000,
            idle: 10000,
            setTimeout: 10000
        },
        //logging: true
    }
=======
  DB.database,
  DB.user,
  DB.password,
  // 'gestionf',
  // 'axeso',
  // 'axeso@D593*',
  {
    host: DB.host,
    // host: '190.116.51.182',
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
    //logging: true
  }
>>>>>>> b66d3f4c019b7bf3c724332411f7314b86b05b4f
);

// export const sequelize = new Sequelize(
//     'gestion',
//     'axeso',
//     'axeso@D593*', {
//         host: '190.116.51.182',
//         dialect: 'postgres',
//         pool: {
//             max: 50,
//             min: 0,
//             require: 30000,
//             idle: 10000
//         },
//         //logging: true
//     }
<<<<<<< HEAD
// );
=======
// );
>>>>>>> b66d3f4c019b7bf3c724332411f7314b86b05b4f
