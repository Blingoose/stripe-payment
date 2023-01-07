import http from "http";
import express from "express";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import notFound from "./middleware/notFound.js";
import { StatusCodes } from "http-status-codes";
import asyncWrapper from "./middleware/asyncWrapper.js";

dotenv.config();
const server = express();
const PORT = process.env.PORT || 8000;

const start = () => {
  try {
    // test route
    server.get(
      "/",
      asyncWrapper((req, res, next) => {
        res.status(StatusCodes.OK).send("Welcome to stripe project");
      })
    );

    // error handling middleware & not found middleware
    server.use(errorHandlerMiddleware);
    server.use(notFound);

    http.createServer(server).listen(PORT, function () {
      console.info("Server is listening on:", this.address());
    });
  } catch (error) {
    console.log(error);
  }
};

start();
