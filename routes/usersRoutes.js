const express = require('express');

const router = express.Router();

router.get('/:name', (req, res) => {
  const { name } = req.params;
  res.send(`soy un usuario y mi nomnbre es ${name}`);
});

module.exports = router;
