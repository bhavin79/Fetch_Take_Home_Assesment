import express from "express";
import helmet from "helmet";
import { createServer } from "http";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
const httpServer = createServer(app);

const start = () => {
  httpServer.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
};

start();
