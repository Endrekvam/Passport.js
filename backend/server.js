const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt  = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const User = require("./user");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://enkv:1234@cluster0.xcowvr6.mongodb.net/PassportTest",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log("Mongoose er tilkoblet");
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes
app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("Innlogging feilet, sjekk passord og brukernavn");
        else {
            req.login(user, err => {
                if (err) throw err;
                res.send("Authentication er suksessfull hurra");
                console.log(req.user);
            });
        }
    })(req, res, next);
})

app.post('/register', (req, res) => {
    User.findOne({username: req.body.username}, async (err,doc) => {
        if (err) throw err;
        if (doc) res.send("Bruker finnes allerede");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User( {
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User ble laget!!!");
        }
    })
})

app.get('/user', (req, res) => {
    res.send(req.user);
});


// Start 

app.listen(4000, () => {
    console.log('Server started på port 4000')
});
