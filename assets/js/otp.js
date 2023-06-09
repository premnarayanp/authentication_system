async function sendOTP(e, otpID) {
    const route = '/otp/create';
    if (otpID) {
        route = '/otp/update/:id'
    }
    const URL = BASE_URL + route;
    const target = e.target;
    var timeCounter = 0;
    target.disabled = true;
    target.style = "background-color:red"

    var intervalId = setInterval(() => {
        console.log("timeCounter=", timeCounter);
        target.innerText = timeCounter;
        if (timeCounter == 60) {
            target.innerText = 'Resend OTP'
            target.disabled = false;
            target.style = "background-color:green"
            clearInterval(intervalId);
        }
        timeCounter += 1;
    }, 1000)

    try {
        const response = await fetch(URL);
        const jsonData = await response.json();

        console.log("jsonData=", jsonData);
        if (jsonData.success) {
            console.log("=======OTP sends=======");
            console.log(jsonData.id);
            target.setAttribute('onclick', `sendOTP(event,'${jsonData.id}')`);
            document.getElementById('OTPid').value = jsonData.id;
        }

    } catch (error) {
        console.log("error=", error);
        return;
    }
}