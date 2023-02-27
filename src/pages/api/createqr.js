export default async function handler(req, res) {
    const body = req.body
    const text = body.text
    // If text includes spaces, replace them with %20
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${text.replace(/ /g, "%20")}`
    
    res.status(200).json({ success: true, qr: `${url}` })
}