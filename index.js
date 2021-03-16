const nodemailer = require('nodemailer');
const express    = require('express');

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const hbs = require('nodemailer-handlebars');

const app        = express();
const cors       = require('cors');
const bodyParser = require('body-parser');

const generated = require('./emailgen');

// Aqui configuraciones
app
  .use(cors({ origin: '*' }))
  .use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '20mb', extended: true }))
  .use(bodyParser.json({ limit: '20mb' }));


require('dotenv').config();


app.get('/', async function (req, res) {
  // const htmlTemplate = await readFile('./templates/template.html', 'utf8')
  const htmlTemplate  = generated.generated({
    title: "Garlic muerete",
    subtitle: "si quieres nomas"
  });
  console.log('htmlTemplate', htmlTemplate);

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const emails = [
    'cristiansotomayor.dev@gmail.com',
    'angelhuamannahui@gmail.com',
    'cristiansotomayor1912@gmail.com',
  ]
  // console.log('parseArrayEmail(emails)', parseArrayEmail(emails))
  // var mailOptions = {
  //   from: 'jgomez.test13@gmail.com',
  //   to: 'cristiansotomayor.dev@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
  var mailOptions = {
    from: 'jgomez.test13@gmail.com',
    to: emails,
    subject: 'Garlic muerete',
    text: 'Sino no quiero',
    html: htmlTemplate
  };
  console.log('haaa', mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).json({
    message: 'Garlic'
  })
})


app.get('/2', async function (req, res) {
  var EmailTemplate = require('email-templates').EmailTemplate
  var path = require('path')
   
  var templateDir = path.join(__dirname, 'templates', 'template')
   
  var newsletter = new EmailTemplate(templateDir)
  var user = {name: 'Joe', pasta: 'spaghetti'}
  newsletter.render(user, function (err, results) {
    // result.html
    // result.text
  })
   
  var async = require('async')
  var users = [
    {name: 'John', pasta: 'Rigatoni'},
    {name: 'Luca', pasta: 'Tortellini'}
  ]
   
  async.each(users, function (user, next) {
    newsletter.render(user, function (err, results) {
      if (err) return next(err)
      // result.html
      // result.text
      // result.subject
    })
  }, function (err) {
    //
  })


  res.status(200).json({
    message: 'Garlic'
  })
})

app.get('/3', async function (req, res) {
  console.log('ESTOY EN 3')
  
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
 
  // let options = {
  //   viewEngine: {
  //     extname: '.handlebars',
  //     layoutsDir: 'views/',
  //     defaultLayout : 'index',
  //   },
  //   viewPath: './views/'
  // }
  var options = {
    extName:'.handlebars', /* or '.handlebars' */
    viewPath:__dirname+'/views/',
    layoutsDir:__dirname+'/view',
    defaultLayout:'index',
    partialsDir:__dirname+'/views/partials/'
  }
  console.log('options', options);
  transporter.use('compile', hbs(options));

  // transporter.use('compile', hbs({
  //   viewEngine: 'express-handlebars',
  //   viewPath: './views/'
  // }));




  // transporter.use('compile', hbs({
  //   defaultLayout: "layout",
  //   layoutsDir: __dirname + "/views/layouts", 
  //   partialsDir: __dirname + "/views/partials"
  // }))


  const emails = [
    'cristiansotomayor.dev@gmail.com',
    'angelhuamannahui@gmail.com',
    'cristiansotomayor1912@gmail.com',
  ]
  // console.log('parseArrayEmail(emails)', parseArrayEmail(emails))
  // var mailOptions = {
  //   from: 'jgomez.test13@gmail.com',
  //   to: 'cristiansotomayor.dev@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
  var mailOptions = {
    from: 'jgomez.test13@gmail.com',
    to: emails,
    subject: 'Garlic muerete',
    text: 'Sino no quiero',
    template: 'example',
    context: {
      title: 'Accime Esterling',
      subtitle: 'Accime Esterling'
    }
  };
  console.log('haaa', mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.status(200).json({
    message: 'Garlic'
  })
})

const { pugEngine } = require("nodemailer-pug-engine");
app.get('/4', async function (req, res) {
  console.log('ESTOY EN 4')
  
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  transporter.use('compile', pugEngine({
    templateDir: __dirname + '/templates',
    pretty: true
  }));


  const emails = [
    'cristiansotomayor.dev@gmail.com',
    'angelhuamannahui@gmail.com',
    'cristiansotomayor1912@gmail.com',
  ]
  var mailOptions = {
    from: 'jgomez.test13@gmail.com',
    to: emails,
    subject: 'Garlic muerete',
    text: 'Sino no quiero',
    template: 'template',
    ctx: {
      title: 'maldito garlic',
      subtitle: 'maldito'
    }
  };
  console.log('haaa', mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.status(200).json({
    message: 'Garlic'
  })
})



app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`);
});

