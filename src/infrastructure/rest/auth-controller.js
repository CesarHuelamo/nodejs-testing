import Express from "express";
import container from "../../container.js";
import { InvalidPasswordException } from "../../domain/user/exceptions/invalid-password-exception.js";
import { UserNotFoundException } from "../../domain/user/exceptions/user-not-found-exception.js";

const router = Express.Router();
const logIn = container.resolve("logIn");

router.post("/log-in", async (req, res) => {
  try {
    console.log("asd");
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

export default router;
