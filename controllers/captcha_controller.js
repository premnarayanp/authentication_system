const Captcha = require('../models/captcha');

module.exports.generate = async function(req, res) {

    const { captcha, captcha_imgStr } = createCaptcha(5);
    const dataUri = captchaStringToImage(captcha_imgStr);

    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    // const ipAddress = req.socket.remoteAddress;
    // console.log("ipAddress=", ipAddress);
    // console.log(dataUri);

    try {
        const captchaDoc = await Captcha.findOne({ ipAddress: ipAddress });
        if (!captchaDoc) {
            // console.log("1-captcha=", captchaDoc);
            const captchaDoc = await Captcha.create({ ipAddress: ipAddress, captcha: captcha });
            // console.log("2-captcha=", captchaDoc);
            return res.send({ success: true, captchaImg: dataUri, id: captchaDoc._id });

        } else {

            captchaDoc.captcha = captcha;
            captchaDoc.save();
            return res.send({ success: true, captchaImg: dataUri, id: captchaDoc._id });
        }

    } catch (error) {
        console.log('error in finding/creating captcha in signing up', error);
        return res.redirect('back');
    }

}

module.exports.re_generate = async function(req, res) {

    const { captcha, captcha_imgStr } = createCaptcha(5);
    const dataUri = captchaStringToImage(captcha_imgStr);
    //console.log("=======re_generate========", req.params.id);

    try {
        const captchaDoc = await Captcha.findById(req.params.id);
        // console.log("1-update captcha=", captchaDoc);
        if (captchaDoc) {
            captchaDoc.captcha = captcha;
            captchaDoc.save();
            //  console.log("2-update captcha=", captchaDoc);
            return res.send({ success: true, captchaImg: dataUri, id: captchaDoc._id });
        } else {
            res.redirect('back');
        }

    } catch (error) {
        console.log('error in reUpdating/re_generating captcha in signing up', error);
        return res.redirect('back');
    }

}

// create random  captcha
function createCaptcha(otpLength) {
    let captcha = "";
    let captcha_imgStr = "";
    const captchaSet = process.env.SECRETE_CAPTCHA_SET;
    for (i = 0; i < otpLength; i++) {
        const index = Math.floor(Math.random() * captchaSet.length);

        captcha += captchaSet[index];
        captcha_imgStr += " " + captchaSet[index];
    }

    return { captcha, captcha_imgStr };
}

//convert captcha(String) to captcha(image)
function captchaStringToImage(captcha_imgStr) {
    const textToImage = require('text-to-image');
    const dataUri = textToImage.generateSync(captcha_imgStr, {
        maxWidth: 80,
        fontSize: 18,
        fontFamily: 'Arial',
        lineHeight: 30,
        margin: 0,
        bgColor: 'rgb(215, 240, 177)',
        textColor: 'red',
    });
    return dataUri;
}