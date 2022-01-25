const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { createPlayerStats, createAccByEmail, readUsers, findDocumentByUser, createSessions } = require('../mongoAuxFiles')

//Login function 
router.post("/", async (req, res) => {
    // o que iremos receber do frontend
    const { userName, password } = req.body
    //console.log("estou aqui", password)
    const users = await readUsers()
    //console.log(users)
    const erros = {}

    if (userName.length == 0) {
        //erros.userName = "Insert your UserName."
        res.status(400).json({ Message: "Insert your UserName." })
        return
    }
    if (password == "") {
        //erros.password = "Please insert password."
        res.status(400).json({ Message: "Please insert password." })
        return
    }

    if (!users.find(e => e.UserName == userName)) {
        //erros.userName = "Hmmm that user does not exist!"
        res.status(400).json({ Message: "Hmmm that user does not exist!" })
        return
    }

    if (users.find(e => e.UserName == userName).Password !== password) {
        //erros.password = "Passwords dont match."
        res.status(400).json({ Message: "Passwords dont match." })
        return
    }
    // if (Object.keys(erros).length !== 0) {
    //     res.status(400).json({ erros })
    //     return
    else {
        const token = await findDocumentByUser(userName)
        console.log(token._id.toString(), "token ")
        await createSessions({ userName, token: token._id.toString() })
        res.status(200).json({
            token: token._id.toString(),
            Message: "Successful Login!"
        })
    }
})


module.exports = router;