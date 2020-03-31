var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index');
});

router.get('/projects', (req, res, next)=> {
  res.render('projects');
});

router.get('/services', (req, res, next)=> {
  res.render('services');
});

//email 
// router.get('/email', (req, res, next)=> {
//   res.render('email');
// });
// router.post('/email_display', (req, res)=> {
//   res.json({message:`messsage received`,
//   Data: req.body
// });

// console.log('Data', req.body);
// });

// nodemailer set up for portfolio web
router.post('/email_display', (req, res, next)=> {
  console.log(`Data received`);
  const output = `
  <P><strong>Mike you have a new contact request</strong></P>
  <h3>Contact details</h3>
  <ul>
  <li> Name:${req.body.name} </li>
  <li> Email:${req.body.email} </li>
  </ul>
  <P> Meassage:${req.body.message} </P>
  `;
// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",//smtp server am using third party sendgrid
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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' // send grid api key
    },
    tls:{rejectUnauthorized:false}
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Portfolio site sent with gmail" <michaelkasingye@gmail.com>', // sender address
    to: "michaelkasingye@gmail.com, michaelkasingye@yahoo.com", // list of receivers
    subject: "Portfolio site contact", // Subject line
    text: "Hello Mike", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou

  //res.render('/email_display',{msg:`message sent`})
  res.json({message:`messsage sent`});
});















// // nodemailer set up template
// router.post('/email_display', (req, res, next)=> {
//   const output = `
//   <P>Mike you have a new contact request</P>
//   <h3>Contact details</h3>
//   <ul>
//   <li> Name:${req.body.email} </li>
//   <li> Email:${req.body.subject} </li>
//   </ul>
//   <P> Meassage:${req.body.text} </P>
//   `;
// // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.sendgrid.net",//smtp server
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'apikey', // generated ethereal user
//       pass: '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' // generated ethereal password
//     },
//     tls:{rejectUnauthorized:false}
//   });

//   // send mail with defined transport object
//   let info = transporter.sendMail({
//     from: '"Nodemailer" <michaelkasingye@gmail.com>', // sender address
//     to: "michaelkasingye@yahoo.com", // list of receivers
//     subject: "node contact request", // Subject line
//     text: "Hello Mike", // plain text body
//     html: output // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou

//   //res.render('/email_display',{msg:`message sent`})
//   res.json({message:`messsage sent`});
// });



module.exports = router;
