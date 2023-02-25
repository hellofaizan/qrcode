var buffer = require('buffer')
export default async function handler(req, res) {
    const body = req.body
    const text = body.text
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${text}`
    
    res.status(200).json({ success: true, qr: `${url}` })
}