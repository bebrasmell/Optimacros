import CarsRouter from "./routers/cars.router.js";
import { Entity } from "./entities/entity.js";
import Env from "./utils/env/env.js";

import express from "express";
import Helmet from "helmet";

// Data base
console.log("⏳ Connecting to", Env.DB_HOST);
await Entity.connect({
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    name: Env.DB_NAME
});
console.log("✅ Connected to database");

// Configure express
const Application = express();

Application.use(express.json());
Application.use(express.urlencoded({ extended: true }));
Application.use(Helmet());

// Router
Application.use(CarsRouter);

// Run server
Application.listen(Env.PORT, () => {
    console.log("✅ Listening on port " + Env.PORT + "...");
});