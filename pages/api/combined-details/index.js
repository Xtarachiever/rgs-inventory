
import { getCombinedDetails } from "@/models/CombinedDetailSchema";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await getCombinedDetails();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

  