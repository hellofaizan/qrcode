import QR from '../../models/QR';
import dbConnect from '../../middleware/mongoose';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const qr = await QR.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, qrs: qr });
    } catch (error) {
        res.status(400).json({ success: false });
    }

}