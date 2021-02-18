const express = require("express");
const router = express.Router();
const Portfolio = require("../../model/Portfolio");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    return res.json(portfolios);
  } catch (error) {
    return res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
    body("description", "is not empty").not().isEmpty(),
    body("img", "is not empty").not().isEmpty(),
    body("link", "is not empty").not().isEmpty(),
    body("title", "is not empty").not().isEmpty(),
    body("type", "is not empty").not().isEmpty(),
  ],
  (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(401).json({ errors: err.array() });
      }

      const portfolio = new Portfolio({
        description: req.body.description,
        img: req.body.img,
        link: req.body.link,
        title: req.body.title,
        type: req.body.type,
      });

      const temp = portfolio.save();
      return res.json(temp);
    } catch (error) {
      return error.status(500), send("server error");
    }
  }
);
module.exports = router;
