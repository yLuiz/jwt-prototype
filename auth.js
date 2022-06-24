const jwt = require('jsonwebtoken')

const SECRET_JWT = "b02DSFsfdsFDSSDE423kli4ret23SDFS23"

const auth = (req, res, next) => {
    const authToken = req.headers['authorization']
    
    if (authToken) { 
        const bearerToken = authToken.split(' ')
        const token =  bearerToken[1]

        console.log(token)

        jwt.verify(token, SECRET_JWT, (err, data) => {
            if (err) {
                res.status(401)
                res.json({error: "Verify: Invalid Token!"})
            } else {
                if (data.acess !== "admin"){
                    res.json({message: "Você não tem acesso!"})
                    return res.status(401)
                }

                req.token = token
                req.loggedUser = { id: data.id, email: data.email, acess: data.acess }
                next()
            }
        })
    } else {
        res.status(401)
        res.json({error: "Token not exist!"})  
    }
}

module.exports = auth

