require("dotenv").config();

import "reflect-metadata";
import app from "./app";

import { createConnection } from "typeorm";

createConnection()
  .then(() => {
    const server = app();
    server
      .listen({ port: process.env.PORT }, async () => {
        console.log(`running in port ${process.env.PORT}`);
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log(error, "database error"));
