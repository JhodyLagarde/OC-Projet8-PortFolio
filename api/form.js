const express = require('express');
const nodeMailer = require('nodemailer');

require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Routing
app.post('/sendMail', (req, res) => {
  console.log(req.body);

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,   //contact.jhody.lagarde@gmail.com
      pass: process.env.pass    //process.env.pass
    }
  });
  
  const mailOptions = {
    from: req.body.email,
    to: 'contact.jhody.lagarde@gmail.com',
    subject: `Message de ${req.body.name}: ${req.body.object}`,
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })

});

app.use("/", express.static('./FrontEnd/dist'));

module.exports = app;