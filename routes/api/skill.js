const express = require("express");
const router = express.Router();
const Skill = require("../../model/Skill");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.json(skills);
  } catch (error) {
    return error.status(500).send("server errors");
  }
});

router.post(
  "/",
  [
    body("name", "not empty").not().isEmpty(),
    body("value", "not empty").not().isEmpty(),
  ],
  (req, res) => {
    try {
      console.log("123");
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(401).json({
          errors: err.array(),
        });
      }

      const skill = new Skill({
        name: req.body.name,
        value: req.body.value,
      });

      const re = skill.save();
      res.json(re);
    } catch (error) {
      return error.status(500).send("server errors");
    }
  }
);
module.exports = router;
