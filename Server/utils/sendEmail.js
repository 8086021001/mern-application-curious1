const nodemailer = require("nodemailer");




 const sendEmail= async(email,subject,text)=>{
    try {

      const htmlcontent = `<html>
      <head>
          <title>Invitation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              h1 {
                  text-align: center;
                  font-size: 36px;
                  color: #4CAF50;
                  text-shadow: 2px 2px #FFA500;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>You're Invited!</h1>
              <a href="${text}">click to verify</a>
          </div>
      </body>
      </html>`;

      
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        service:'gmail',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        }
      });
        const info = await transporter.sendMail({
          from: `curious1<${process.env.EMAIL_USER}>`, // sender address
          to: email, // list of receivers
          subject: subject?subject:"Hello ✔ welcome to curious1", // Subject line
          text: text?text:"Hello !!?", 
          html:htmlcontent
          
        });
        console.log(info)
              
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info

        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
    } catch (error) {
        console.log(error,"email not sent")
        return error
    }

}

module.exports = sendEmail