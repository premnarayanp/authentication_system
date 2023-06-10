const OTP = require('../models/otp');
module.exports.send = async function(req, res) {
    console.log("================In OTP send========================")
    const mail = req.params.mailId;
    const otpMailer = require('../mailers/otp_mailer');

    try {
        const otpVal = createOTP(5);
        const otp = { otp: otpVal, mail: mail };

        const otpDoc = await OTP.findOne({ mail: mail });
        const expireTime = new Date().getTime() + 1000 * 60;
        //console.log("otpDoc=", otpDoc);
        if (!otpDoc) {
            const otpDoc = await OTP.create({ mail: mail, otp: otpVal, expireTime: expireTime });
            let result = await otpMailer.newOTP(otp);
            if (result.success) {
                return res.send({ success: true, mailTo: result.info.accepted[0], otpId: otpDoc._id });
            } else {
                return res.send({ success: false, mail: 'null', msg: "unable to send OTP,Please try again " });
            }

        } else {
            console.log("===============inside updated======================");
            otpDoc.otp = otpVal;
            otpDoc.expireTime = expireTime;
            otpDoc.save();
            let result = await otpMailer.newOTP(otp);
            if (result.success) {
                return res.send({ success: true, mailTo: result.info.accepted[0], otpId: otpDoc._id });
            } else {
                return res.send({ success: false, mail: 'null', msg: "unable to send OTP,Please try again " });
            }
        }

    } catch (error) {
        console.log('something went wrong to send OTP,Please try again', error);
        return res.send({ success: false, mail: 'null', msg: "something went wrong to send OTP,Please try again " });
    }
}




module.exports.resend = async function(req, res) {
    console.log("================In OTP resend========================")
    const otpMailer = require('../mailers/otp_mailer');
    const otpVal = createOTP(5);

    try {
        const otpDoc = await OTP.findById(req.params.otpId);
        console.log("1-update otp=", otpDoc);
        const expireTime = new Date().getTime() + 1000 * 60;

        if (otpDoc) {
            otpDoc.otp = otpVal;
            otpDoc.expireTime = expireTime;
            otpDoc.save();
            console.log("2-update otp=", otpDoc);

            const otp = { otp: otpVal, mail: otpDoc.mail };

            let result = await otpMailer.newOTP(otp);
            if (result.success) {
                return res.send({ success: true, mailTo: result.info.accepted[0], otpId: otpDoc._id });
            } else {
                return res.send({ success: false, mail: 'null', msg: "unable to send OTP,Please try again " });
            }
        } else {
            return res.send({ success: false, mail: 'null', msg: "req id is wrong ,Please refresh page and try again " });
        }

    } catch (error) {
        console.log('something went wrong to send OTP,Please try again', error);
        return res.send({ success: false, mail: 'null', msg: "something went wrong to send OTP,Please try again " });
    }

}

// create random  OTP
function createOTP(otpLength) {
    let otp = "";
    const otpSet = process.env.SECRETE_OTP_SET;
    for (i = 0; i < otpLength; i++) {
        const index = Math.floor(Math.random() * otpSet.length);
        otp += otpSet[index];
    }

    return otp;
}





// const nodeMailer = require('nodemailer');
// let transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//     }
// });

// transporter.sendMail({
//     from: 'premnarayanpatel3132@gmail.com',
//     to: otp.mail,
//     subject: "OTP for Forget Password",
//     html: `<h1>Your 5 digits  OTP is:-${otp.otp}</h1><h2> please Do not share this</h2> <h2>WARNING:- valid only for 1 mints</h2>`
// }, (error, info) => {
//     if (error) {
//         console.log("Error in sending mail", error);
//         return;
//     }
//     console.log("message send to ", info);
//     return;
// });