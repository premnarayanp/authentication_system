const transporter = require('../config/nodemailer');
//OTP mailer --send OTP on mail
exports.newOTP = async(otp) => {
    return new Promise((resolve, reject) => {

        transporter.sendMail({
            from: 'premnarayanpatel3132@gmail.com',
            to: otp.mail,
            subject: "OTP for Forget Password",
            html: `<h1>Your 5 digits  OTP is:-${otp.otp}</h1><h2> please Do not share this</h2> <h2>WARNING:- valid only for 1 mints</h2>`
        }, (error, info) => {
            if (error) {
                console.log("Error in sending mail", error);
                console.log("=====================resect===================");
                reject({ success: false });

            }
            // console.log("message send to ", info);
            resolve({ success: true, info: info });
        });

    })
}




//throw callback 
// exports.newOTP = (otp) => {
//     // console.log("inside newOTP mailer", otp);
//     transporter.sendMail({
//         from: 'premnarayanpatel3132@gmail.com',
//         to: otp.mail,
//         subject: "OTP for Forget Password",
//         html: `<h1>Your 5 digits  OTP is:-${otp.otp}</h1><h2> please Do not share this</h2> <h2>WARNING:- valid only for 1 mints</h2>`
//     }, (error, info) => {
//         if (error) {
//             console.log("Error in sending mail", error);
//             return { success: false }
//         }
//         //console.log("message send to ", info);
//         return { success: true, info: info };
//     });
// }