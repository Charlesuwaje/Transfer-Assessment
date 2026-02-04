// import "dotenv/config";
// import { app } from "./app";

// const port = Number(process.env.PORT || 3000);
// app.listen(port, () => console.log(`Listening on :${port}`));


import "dotenv/config";
import app from "./app";
// import { sequelize } from "./db";
// import { sequelize } from "./  db/sequelize";
import { sequelize } from "./db/sequelize";

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch(console.error);
