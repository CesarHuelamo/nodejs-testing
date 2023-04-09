const Express = require("express");
const container = require("./container");
const authController = require("./infrastructure/rest/auth-controller");

const app = Express();
app.use(Express.json());

app.use("/api/v1/auth", authController);
const server = app.listen(3000);

module.exports = { app, server };
