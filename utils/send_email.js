require("dotenv").config();
const sender_email_address = process.env.EMAIL_ID;
const sender_password = process.env.EMAIL_PASSWORD;
const host = process.env.HOST;
const port = process.env.NODEMAILERPORT;
const nodemailer = require("nodemailer");

const sendMail = async (receiver_id, subject, body) => {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host,
        port,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: sender_email_address,
            pass: sender_password,
        },
    });

    //Email information
    var info = {
        from: sender_email_address,
        to: receiver_id,
        subject: subject,
        text: body,
        html: `<b>${body}</b>`
    }

    // sending mail
    transporter.sendMail(info, (err, mail) => {
        if (err) {
            console.log(err)        //If error 

        }
        else {
            console.log(mail.response)
        }
    })
}

module.exports = {
    sendMail
}
