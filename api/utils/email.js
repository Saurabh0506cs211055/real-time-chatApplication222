import Email from "nodemailer"

const sendemail = ((email,otp)=>{
    console.log(email);
    var transporter = Email.createTransport({
        service: 'gmail',
        auth: {
          user: '0506cs211055saurabh@gmail.com',
          pass: 'mpta avub exfd pspx'
        }
      });
      
      var mailOptions = {
        from: '0506cs211055saurabh@gmail.com',
        to: email,
        subject: 'verification',
        html : `<h1>${otp}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})
export default sendemail;