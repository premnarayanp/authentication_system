// const ejs = require('ejs');
//const path = require('path');

//nodemailer transporter Objects
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});
module.exports = transporter;


// let renderTemplate = (data, relativePath) => {
//     let mailHTML;
//     ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath),
//         data,
//         function(error, template) {
//             if (error) {
//                 console.log("error in rendering template");
//                 return;
//             }
//             mailHTML = template;
//         }
//     )
//     return mailHTML;
// }

// module.exports = {
//     transporter: transporter,
//     renderTemplate: renderTemplate,
// }