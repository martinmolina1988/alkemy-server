const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')

//procedimiento para registrarnos
exports.register = async (req, res) => {
    const { name, email, password } = req.body;


    try {

        let passwordHash = await bcryptjs.hash(password, 8)
        conexion.query('INSERT INTO mydb.user SET ?', { email: email, name: name, password: passwordHash }, (error, results) => {
            if (error) { console.log(error) }
            res.send(error)
        })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                error: "Ingrese un usuario y password"
            })
        } else {
            conexion.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
               
                if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
                    res.json({
                        auth: false,
                        error: "Usuario y/o Password incorrectas",
                    })
                } else {
                    //inicio de sesión OK
                    const id = results[0].id
                    const name =results[0]?.name;
                    // Create a Token
                    
                    const token = jwt.sign({ id,name }, process.env.SECRET, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    res.json({ auth: true, token });


                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results) => {
            
                if (!results) { return next() }
                req.email = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.send({auth:false,error})
    }
}
exports.users = async (req, res) => {
    try {
        conexion.query('SELECT * FROM users', (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}