const express = require("express");

const router = express.Router();

// GET ROUTE //
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to our Express App')
});

module.exports = router;
