// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
//   dialect: "postgres",
//   logging: false
// });

// // Register models
// export * from "../models/Wallet";
// export * from "../models/TransactionLog";
// export * from "../models/LedgerEntry";
// export * from "../models/InterestAccrual";


// export { sequelize } from "./sequelize";

// export { Wallet } from "../models/Wallet";
// export { TransactionLog } from "../models/TransactionLog";
// export { LedgerEntry } from "../models/LedgerEntry";
// export { InterestAccrual } from "../models/InterestAccrual";


// export { sequelize } from "./sequelize";

// export { Wallet } from "../models/Wallet";
// export { TransactionLog } from "../models/TransactionLog";
// export { LedgerEntry } from "../models/LedgerEntry";
// export { InterestAccrual } from "../models/InterestAccrual";


export { sequelize } from "./sequelize";

export { Wallet } from "../models/Wallet";
export { TransactionLog } from "../models/TransactionLog";
export { LedgerEntry } from "../models/LedgerEntry";
export { InterestAccrual } from "../models/InterestAccrual";

