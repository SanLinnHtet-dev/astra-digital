import process from "node:process";
import http from "http";
import app from "./app";
import logger from "./utils/logger";
// import { sequelize } from "./models";

const port = process.env.PORT || 8081;

(async () => {
  try {
    const server = http.createServer(app);
    // await sequelize.sync({ alter: true });
    server.listen(port, () => {
      logger.info(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    logger.error("Unable to connect to the database:", error);
  }
})();