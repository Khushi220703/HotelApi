const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const sendVerification = async (userName, userEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const payload = {
            userEmail,
            
        };

        const options  = {
            expiresIn:"1h",
            algorithm:"HS256"
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY,options)
        const verificationLink = `${process.env.LINK}?token=${token}`;
        const templatePath = path.resolve("Templates", "EmailVerification.html");
        const htmlContent = await ejs.renderFile(templatePath, { userName, verificationLink });

       
       
        
        const transportOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Airbnb Email Verification",
            html: htmlContent,
        };

        return await transporter.sendMail(transportOptions);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};


module.exports = sendVerification;