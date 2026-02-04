// require("dotenv").config();

// module.exports = {
//   development: {
//     url: process.env.DATABASE_URL,
//     dialect: "postgres",
//     logging: false
//   },
//   test: {
//     url: process.env.DATABASE_URL,
//     dialect: "postgres",
//     logging: false
//   },
//   production: {
//     url: process.env.DATABASE_URL,
//     dialect: "postgres",
//     logging: false
//   }
// };

import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: false
});
