const express = require("express")
const path = require("path")
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS
const app = express()

app.use(express.static(path.join(__dirname, "build")))

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301))

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(5000)

app.use(router);