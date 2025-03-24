const mongoose = require("mongoose"); 
const twilio= require("twilio");
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = new twilio(accountSid, authToken);
const Schema = mongoose.Schema;
const userDetails = new Schema({
    fromDate: String,
    toDate: String,
    gmail: String,
    // phonenumber: Number,
    noOfRooms: Number,
    people: Number
})
userDetails.post("save", async function (doc) {
    try {
        const message = `📢 New Room Booking!\n\n🛏️ Dates: ${doc.fromDate} - ${doc.toDate}\n Email or Phone: ${doc.gmail}\n No of rooms : ${doc.noOfRooms} \n  People : ${doc.people}`;

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