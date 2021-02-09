const express = require("express");
const router = express.Router();
const Experience = require("../../model/Experience");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    console.log(experiences);
    return res.json(experiences);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    body("company", "is not empty").not().isEmpty(),
    body("description", "is not empty").not().isEmpty(),
    body("position", "is not empty").not().isEmpty(),
    body("type", "is not empty").not().isEmpty(),
    body("year", "is not empty").not().isEmpty(),
  ],
  async (req, res) => {
    try {
        console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const newExp = new Experience( {
        company: req.body.company,
        description: req.body.description,
        position: req.body.position,
        type: req.body.type,
        year: req.body.year,
      });

      const exp = newExp.save();
      res.json(exp);
    } catch (error) {
        res.status(500).send("server error")
    }
  }
);
module.exports = router;
