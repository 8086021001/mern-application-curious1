const nodemailer = require("nodemailer");




 const sendEmail= async(email,subject,text)=>{
    try {

      
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        service:'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        }
      });
        const info = await transporter.sendMail({
          from: `curious1<${process.env.EMAIL_USER}>`, // sender address
          to: email, // list of receivers
          subject: subject?subject:"Hello ✔ welcome to curious1", // Subject line
          text: text?text:"Hello world?", // plain text body
          // html: "<b>text</b>", // html body
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