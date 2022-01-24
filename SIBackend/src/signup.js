const express = require("express")
const app = express()
const port = process.env.PORT ?? 3002
const { MongoClient } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"
app.use(express.json())

let client
async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
        }
        return client;
    } catch (err) {
        console.log(err)
    }
}
async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}
async function createAccByEmail(email) {
    const collection = await getMongoCollection("Projeto", "testes")
    const result = await collection.insertOne(email)
    return result.insertedId
}
async function readUsers() {
    const collection = await getMongoCollection("Projeto", "testes")
    const result = await collection.find().toArray()
    return result
}
async function createPlayerStats(userName) {
    const collection = await getMongoCollection("Projeto", "Stats")
    const result = await collection.insertOne(userName)
    return result.insertedId
}
connectToMongo()
// Endpoint Do registo do utilizador 
app.post('/signup', async (req, res) => {
    const { email, userName, password, passwordConfirmation } = req.body
    const erros = {}
    const users = await readUsers()
    //console.log(users)
    // Verifica os parametros com os dados que temos ver se cumprem as regras

    if (checkEmail(email)) {
        erros.email = checkEmail(email)
        //console.log(erros)
    }
    if (users.some(e => e.email === email)) {
        erros.email = "Please check your email .It is possible that you have already signup."
    }
    if (checkPasswordStrength(password) < 4) {
        erros.password = "Your Password must contain at least an uppercase letter, a Number and a special character."
    }

    if (userName.length == 0) {
        erros.UserName = "Please insert a Username."
    }

    if (users.some(e => e.UserName == userName)) {
        erros.UserName = "Your Awsome name as already been taken!"

    }

    if (password !== passwordConfirmation) {
        erros.passwordComfirmation = "Your passwords dont match!"

    }

    if (Object.keys(erros).length !== 0) {
        res.status(400).json({ erros })

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
app.post("/", async (req, res) => {
    // o que iremos receber do frontend
    const { userName, password } = req.body
    const users = await readUsers()
    //console.log(users)
    const erros = {}
    if (!users.find(e => e.UserName == userName)) {
        erros.userName = "Hmmm that user does not exist!"
    }
    if (userName.length == 0) {
        erros.userName = "Insert your UserName."
    }
    if (users.find(e => e.UserName == userName).Password !== password) {
        erros.password = "Passwords dont match."
    }
    if (Object.keys(erros).length !== 0) {
        res.status(400).json({ erros })
        return
    }
    else {
        res.status(200).json({ Message: "Successful Login!" })
    }
})

function checkEmail(email) {
    let erros
    if (!validateEmail(email)) {
        erros = "Your email is not valid."
    }
    if (email.length == 0) {
        erros = "Please insert an email."
    }
    return erros
}
function checkPasswordStrength(password) {
    if (password.length < 8) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[~!@#$%^&*)(+=._-]/
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}
function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))