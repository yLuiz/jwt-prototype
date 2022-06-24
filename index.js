const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const app = express()

const auth = require('./auth')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const SECRET_JWT = "b02DSFsfdsFDSSDE423kli4ret23SDFS23"
const myDB = {
    users: [
        {
            id: 1,
            name: "Luiz",
            email: "luizvictor1231@gmail.com",
            password: "lv1231",
            acess: "admin" //admin
        },
        {
            id: 10,
            name: "Luan",
            email: "luan321@gmail.com",
            password: "ln321",
            acess: "guest"
        }
    ],
    games: [
        {
            id: 32,
            name: "Call of Duty"
        },
        {
            id: 2,
            name: "Counter-Strike Global:Offensive"
        }
    ]
}

app.get('/', (req, res) => {
    res.send("API works!")
})

app.get('/games', auth, (req, res) => {
    
    const userData = req.loggedUser

    res.json([myDB.games, userData])
})

app.post('/auth', (req, res) => {
    const { email, password } = req.body

    const user = myDB.users.find(u => u.email == email)

    if(!user) {
        res.status(404)
        return res.json({error: "E-mail sent not exist!"})
    }

    if (password == user.password) {
        jwt.sign({id: user.id, email: user.email, acess: user.acess}, SECRET_JWT, {expiresIn: '48h'}, (err, token) => {
            if (err) {
                res.status(400)
                return res.json({error: err})
            }

            res.json({token: token})
            return res.status(200)
        })

    } else {
        res.status(401)
        res.json({error: "Invalid Credentials!"})
    }
})

app.listen(3200, (err) => {
    if (err) console.log(`Deu error: ${err}`)

    console.log("API funcionando em: http://localhost:3200/")
})