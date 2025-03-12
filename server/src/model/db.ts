import { Sequelize, Options } from "sequelize";
import { config } from "../config";
import { initTournament } from "./tournaments";

const sequelizeOptions: Options = {
  logging: console.log, // You can set this to false to disable logging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const sequelize = new Sequelize(config.database, sequelizeOptions);
export const Tournament = initTournament(sequelize);

export const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Add this line to sync models with the database
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Re-throw the error for proper error handling
  }
};