import QR from '../../models/QR';
import dbConnect from '../../middleware/mongoose';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        console.log(req.body);
        let qr = QR.findByIdAndDelete(req.body)
        res.status(200).json({ success: true });

    } else {
        res.status(400).json({ success: false });
    }

}