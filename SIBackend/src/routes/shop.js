const express = require("express")
const router = express.Router();

router.get('/', (req, res) => {
    const token = req.header("Authorization")
    console.log(token)
    if (token == undefined || token == String(null)) {
        res.sendStatus(401)
    }
    else res.sendStatus(200)
})

module.exports = router;