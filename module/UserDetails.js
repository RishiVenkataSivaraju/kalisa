const mongoose = require("mongoose");
require('dotenv').config(); 
const accountSid = process.env.accountSid
const authToken = process.env.authToken;
const client = new twilio(accountSid,authToken)
const adminPhoneNumber = process.env.adminPhoneNumber; 
const twilioWhatsAppNumber = process.env.twilioWhatsAppNumber;
const Schema = mongoose.Schema;
const userDetails = new Schema({
    fromDate: String,
    toDate: String,
    gmail: String,
    phonenumber: Number,
    noOfRooms: Number,
    people: Number
})
userDetails.post("save", async function (doc) {
    try {
        const message = `📢 New Room Booking!\n\n🛏️ Dates: ${doc.fromDate} - ${doc.toDate}\n📧 Email: ${doc.gmail}\n📞 Phone: ${doc.phonenumber} \n No of rooms : ${doc.noOfRooms} \n  People : ${doc.people}`;

        await client.messages.create({
            from: twilioWhatsAppNumber,
            to: adminPhoneNumber,
            body: message
        });

        console.log("WhatsApp notification sent to admin.");
    } catch (error) {
        console.error("Failed to send WhatsApp notification:", error);
    }
});
const USERDETAILS = mongoose.model("USERDETAILS", userDetails);
module.exports = USERDETAILS;