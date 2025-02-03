import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import conifgRoutes from "./routes/index.js";
import {ToggleToObject} from "./data/receiptsData.js"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
const httpServer = createServer(app);
conifgRoutes(app);

//Only uncomment if running without docker
// it till toggle the data storage from redis-stack to simple javascript object;
// ToggleToObject();

const start = () => {
  httpServer.listen(3000, () => {
    console.log(`Server is listening...`);
  });
};

start();
