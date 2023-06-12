# authentication_syste
#deploy:-https://auth-system-2chl.onrender.com;
#Database :- mongodb cloud.
#security:- using .env file .

#Features:-
1:- login/signpu with session using  passpoirt 

2:- login/signup with email and password (passport local authentication)

3:- login/signup with google account (passport google authentication)

4:- logout from  both (passport local and google  authentication)

5:- generate/regenrate captcha code and validate on node js , during signup

6:- paralel send mail using nodemailer with using smpt server

7:- send OTP on email .

9:- Reset Password By sending link on email id,after open link open the reset password form ,then click reset then it fetch access token and its expire time ,then reset when user logged in 

10:- Forget password  using send OTP  on mail ,if OTP not expired then forget.

11:- send notification usinf Noty also  with express or on client side when comes fetch/xhr req/res

12:-show home page.

 #Extra Package npm package :-
 
 1:- nodemailer -for send mail
 
 2:- dotenv -for .env file
 
 3:- text-to-image -it convert String captcha into Image formate.
 
 4:- connect-flash -for Noty Notification
 
 5:- crypto - not used , but purpose were to encypt the password.
 
Thanks .
