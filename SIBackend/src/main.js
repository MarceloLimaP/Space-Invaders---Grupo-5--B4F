const express = require("express")
const app = express()
const port = process.env.PORT ?? 3002
app.use(express.json())
const routerSignup = require('./routes/signup')
const routerLogin = require('./routes/login')
const routerMenu = require('./routes/menu')
const routerShop = require('./routes/shop')
// Endpoint Do registo do utilizador 

app.use('/signup', routerSignup)
app.use('', routerLogin)
app.use('/menu', routerMenu)
app.use('/shop' ,routerShop )



app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))