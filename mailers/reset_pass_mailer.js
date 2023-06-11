const transporter = require('../config/nodemailer');
exports.newPassRestLink = async(link) => {
    return new Promise((resolve, reject) => {

        transporter.sendMail({
            from: 'premnarayanpatel3132@gmail.com',
            to: link.email,
            subject: "LINK for Reset Password",
            html: `<h1>Your Link is :- <a href=${link.link}> Click Here to reset Password</a></h1> <h2> please Do not share this LINK</h2> <h2>WARNING:- valid only for 10 mints</h2>`
        }, (error, info) => {
            if (error) {
                console.log("Error in sending mail", error);
                console.log("=====================reject===================");
                reject({ success: false });

            }
            // console.log("message send to ", info);
            resolve({ success: true, info: info });
        });

    })
}