require("dotenv").config();
import "reflect-metadata";

import app from "./app";
import { createConnection } from "typeorm";

createConnection()
  .then(() => {
    app()
      .listen({ port: process.env.PORT }, () => {
        console.log(`running in port ${process.env.PORT}`);
      })
      .catch((err) => console.log(err, "server error"));
  })
  .catch((error) => console.log(error, "database error"));
