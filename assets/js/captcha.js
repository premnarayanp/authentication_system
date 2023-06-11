//load/get  captcha from server
async function loadCaptcha() {
    const URL = BASE_URL + '/captcha/generate';
    try {
        const response = await fetch(URL);
        console.log("response ", response);
        const jsonData = await response.json();

        console.log("jsonData=", jsonData);
        if (jsonData.success) {
            console.log("=======Captcha gets=======", jsonData.captchaImg);
            const captchaImg = document.getElementById('captcha-img')
            captchaImg.src = jsonData.captchaImg;
            const resetBtn = document.getElementById('reset-captcha-btn');
            //console.log(jsonData.id);
            resetBtn.setAttribute('onclick', `resendCaptcha('${jsonData.id}')`);
            document.getElementById('captchaId').value = jsonData.id;
        }

    } catch (error) {
        console.log("error=", error);
        return;
    }
}

//Resend captcha req and get captcha
async function resendCaptcha(captchaId) {
    const URL = BASE_URL + `/captcha/re_generate/${captchaId}`;
    try {
        const response = await fetch(URL);
        console.log("response ", response);
        const jsonData = await response.json();

        console.log("jsonData=", jsonData);
        if (jsonData.success) {
            console.log("=======Captcha gets=======", jsonData.captchaImg);
            const captchaImg = document.getElementById('captcha-img')
            captchaImg.src = jsonData.captchaImg;

            //const resetBtn = document.getElementById('reset-captcha-btn');
            //console.log(jsonData.id);
            //resetBtn.setAttribute('onclick', `resendCaptcha('${jsonData.id}')`);
        }

    } catch (error) {
        console.log("error=", error);
        return;
    }

}