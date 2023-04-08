import Express from "express";
import container from "./container.js";
import authController from "./infrastructure/rest/auth-controller.js";

const app = Express();
app.use(Express.json());

app.use("/api/v1/auth", authController);
app.listen(3000);
