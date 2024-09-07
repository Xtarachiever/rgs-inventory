import connectMongo from "@/database/conn";
import Notifications from "@/models/NotificationSchema";

export default async function handler(req, res) {

    connectMongo().catch((error) =>
      res.json({ message: "Connection Failed ..." })
    );

    if (req.method === "GET") {
      try {
        const getNotifications = await Notifications.find({}).sort({ createdAt: -1 });

        if(!getNotifications){
            return res.status(401).json({message:'No Notification found'})
        }
        return res.status(200).json({message:'Notifications successfully retrieved', notifications:getNotifications, status:true})

      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(404).json({ message: "Only GET request are accepted" });
    }
}
