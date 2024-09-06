import nodemailer from "nodemailer";

const email = process.env.EMAIL
const email_pass = process.env.EMAIL_PASS
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:email,
        pass:email_pass
    }
});

export const mailOptions = {
    from: email,
    to: email
}