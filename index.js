import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import conifgRoutes from "./routes/index.js";
import "dotenv/config.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
const httpServer = createServer(app);
conifgRoutes(app);


const start = () => {
  httpServer.listen(3000, () => {
    console.log(`Server is listening...`);
  });
};

start();
