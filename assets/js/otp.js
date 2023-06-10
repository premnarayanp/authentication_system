async function sendOTP(e, otpId) {
    const mailId = document.getElementById('mail-id').value;
    const route = otpId ? `/otp/resend/${otpId}` : `/otp/send/${mailId}`;

    const URL = BASE_URL + route;
    const target = e.target;
    var timeCounter = 0;
    target.disabled = true;
    target.style = "background-color:red"
    target.innerText = "Sending...";

    try {
        const response = await fetch(URL);
        const jsonData = await response.json();

        //console.log("jsonData=", jsonData);
        if (jsonData.success) {
            console.log("=======OTP sends=======");
            console.log(jsonData.otpId);
            target.setAttribute('onclick', `sendOTP(event,'${jsonData.otpId}')`);
            document.getElementById('OTPid').value = jsonData.otpId;


            var intervalId = setInterval(() => {
                console.log("timeCounter=", timeCounter);
                target.innerText = timeCounter;
                if (timeCounter == 60) {
                    target.innerText = 'Resend OTP'
                    target.disabled = false;
                    target.style = "background-color:green"
                    clearInterval(intervalId);
                    return;
                }
                timeCounter += 1;
            }, 1000)
        } else {
            target.innerText = 'Resend OTP'
            target.disabled = false;
            target.style = "background-color:green"
        }

    } catch (error) {
        console.log("error=", error);
        return;
    }
}