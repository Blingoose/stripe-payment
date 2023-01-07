import http from "http";
import express from "express";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import notFound from "./middleware/notFound.js";
import stripeController from "./controllers/stripeController.js";
import cors from "cors";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;

// application specific middleware
server.use(cors());
server.use(express.json());
server.use(express.static("./public"));

// route
server.post("/stripe", stripeController);

// error handling middleware & not found middleware
server.use(errorHandlerMiddleware);
server.use(notFound);

const start = () => {
  try {
    http.createServer(server).listen(PORT, function () {
      console.info("Server is listening on:", this.address());
    });
  } catch (error) {
    console.log(error);
  }
};

start();
