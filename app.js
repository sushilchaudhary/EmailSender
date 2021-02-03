const express = require ("express");
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require ('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

// const publicDirectory = path.join(__dirname, './public');
// app.use(express.static(publicDirectory));
app.use(express.static("assets"));

// parse URL-encoaded bodies(as send by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(cookieparser());

console.log(__dirname);
//Handle Bar//
app.set('view engine', 'ejs')

// Static Folder //
app.use(express.static("assets"));

// Body Parser Middleware //

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res)=> {
    res.render("home")
});

        app.post('/send',(req,res)=>{
        // console.log(req.body);
        const output = `
        <p> You have a new contact request </p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.Name}</li>
        <li>Company: ${req.body.Company}</li>
        <li>Email: ${req.body.Email}</li>
        <li>Phone: ${req.body.Phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.Message}</p>
        `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'sushil.chaudhary.lpu@gmail.com', // generated ethereal user
                pass: 'SUShil@1234'  // generated ethereal password
            },
            tls:{
            rejectUnauthorized:false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Nodemailer Contact" <sushil.chaudhary.lpu@gmail.com>', // sender address
            to: 'sushil.chaudhary@team.channelplay.in', // list of receivers
            subject: 'Node Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', {msg:'Email has been sent'});
        });
        });

    app.listen(5004,()=>{
    console.log('server started on port 5004');
    })