const express = require("express")
const app = express()
const port = process.env.PORT ?? 3777



app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))