import QR from '../../models/QR';
import dbConnect from '../../middleware/mongoose';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        console.log(req.body);
            let qr = new QR({
                qrCode: req.body.qrCode,
                qrName: req.body.qrName,
            });
            qr = await qr.save();
            res.status(200).json({ success: true, data: qr });
        
    } else {
        res.status(400).json({ success: false, message: error.message });
    }

}