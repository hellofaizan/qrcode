var jwt = require('jsonwebtoken');
export default function handler(req, res) {
    const body = req.body
    const pass = process.env.PASSWWORD
    const password = body.password
    if (password === pass) {
        var token = jwt.sign(password, 'tokenkey');
        res.status(200).json({ success: true, data: `${token}` })

    } else {
        res.status(200).json({ success: false, message: `Wrong Passwod. You cant access this website.` })
    }
}