const Express = require("express");
const container = require("../../container");
const { InvalidPasswordException } = require("../../domain/user/exceptions/invalid-password-exception");
const { UserNotFoundException } = require("../../domain/user/exceptions/user-not-found-exception");

const router = Express.Router();

router.post("/log-in", async (req, res) => {
  try {
    const logIn = container.resolve("logIn");
    const response = await logIn.execute(req.body);
    res.json(response);
  } catch (err) {
    if (err instanceof InvalidPasswordException || err instanceof UserNotFoundException) {
      res.status(401).send();
      return;
    }

    res.status(500).send();
  }
});

module.exports = router;
