const express = require("express");
const router = express.Router();
const Infor = require("../../model/Infor");
const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  try {
    const infor = await Infor.find();

    return res.json(infor);
  } catch (error) {
    return res.status(500).send("server errorr");
  }
});

router.post(
  "/",
  [
    body("cv", "not null").not().isEmpty(),
    body("dob", "not null").not().isEmpty(),
    body("hometown", "not null").not().isEmpty(),
    body("intro", "not null").not().isEmpty(),
    body("language", "not null").not().isEmpty(),
    body("location", "not null").not().isEmpty(),
    body("name", "not null").not().isEmpty(),
    body("university", "not null").not().isEmpty(),
  ],
  (req, res) => {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(401).json({ error: errs.array() });
      }

      const infor = new Infor({
        cv: req.body.cv,
        dob: req.body.dob,
        hometown: req.body.hometown,
        intro: req.body.intro,
        language: req.body.language,
        location: req.body.location,
        name: req.body.name,
        university: req.body.university,
      });

      return res.json(infor.save());
    } catch (error) {
      return res.status(500).send("server error");
    }
  }
);
module.exports = router;
