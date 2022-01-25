const express = require("express")
const router = express.Router();
const { checkEmail, checkPasswordStrength } = require('../helperFunctions/functions')
const { createPlayerStats, createAccByEmail, readUsers } = require('../mongoAuxFiles')

// Endpoint Do registo do utilizador 
router.post('/', async (req, res) => {
    const { email, userName, password, passwordConfirmation } = req.body
    const erros = {}
    const users = await readUsers()
    //console.log(users)
    // Verifica os parametros com os dados que temos ver se cumprem as regras

    if (checkEmail(email)) {
        erros.Message = checkEmail(email)
        res.status(400).json(erros)
        return
    }
    if (users.some(e => e.email === email)) {
        erros.Message = "Please check your email .It is possible that you have already signup."
        res.status(400).json(erros)
        return
    }
    if (checkPasswordStrength(password) < 4) {
        erros.Message = "Your Password must contain at least an uppercase letter, a Number and a special character."
        res.status(400).json(erros)
        return
    }

    if (userName.length == 0) {
        erros.Message = "Please insert a Username."
        res.status(400).json(erros)
        return
    }

    if (users.some(e => e.UserName == userName)) {
        erros.Message = "Your Awsome name as already been taken!"
        res.status(400).json(erros)
        return

    }

    if (password !== passwordConfirmation) {
        erros.Message = "Your passwords dont match!"
        res.status(400).json(erros)
        return
    }


    else {
        //Se não houver erros guardamos os dados necessários
        //console.log(userName, email, password, passwordComfirmation)
        await createAccByEmail({
            Email: email,
            UserName: userName,
            Password: password,
            Currency: 0
        })
        await createPlayerStats({
            UserName: userName,
            Score: 0,
            UnlockedSpaceship: [],

        })
        res.status(200).json({ Message: "Your Account has been created!" })
    }
})

module.exports = router;