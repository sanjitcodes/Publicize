var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var app = express();
var Student = require("./models/student");
var Club = require("./models/club");
var passport = require("passport");
// var LocalStrategy = require("passport-local");
const LocalStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");


const accountSid = 'AC58d67c69fc3ba78554de312d1b4170bb';
const authToken = '5809f65146d6231178b38f2e6a1af9b1';
const client = require('twilio')(accountSid, authToken);


mongoose.connect('mongodb://localhost:27017/Publicize', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "This the secret message for authentication",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('student-signup', new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

passport.use('club-signup', new LocalStrategy(Club.authenticate()));
passport.serializeUser(Club.serializeUser());
passport.deserializeUser(Club.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



// ----------- Routes --------------------


//------------------------ Student Authentication Routes  ------------------------- 

app.get("/student_login", function (req, res) {
    res.render("student_login.ejs");
});
app.get("/student_signup", function (req, res) {
    res.render("student_signup.ejs");
});

app.post("/student_signup", function (req, res) {
    Student.register(
        new Student({
            username: req.body.username,
            name: req.body.name,
            year: req.body.year,
            clubs: req.body.clubs,
            phone: req.body.phone
        }),
        req.body.password, function (err, user) {

            if (err) {
                console.log(err);
            }
            passport.authenticate("student-signup")(req, res, function () {
                res.redirect("/");
            });
        });
});

app.post("/student_login", passport.authenticate("student-signup", {
    successRedirect: "/",
    failureRedirect: "/student_login"
}), function (req, res) {
});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// ------------------------Student Authentication Ends ------------------------------




// --------------------- Club Authentication ----------------

app.get("/club_login", function (req, res) {
    res.render("club_login.ejs");
});
app.get("/club_signup", function (req, res) {
    res.render("club_signup.ejs");
});

app.post("/club_signup", function (req, res) {
    Club.register(
        new Club({
            username: req.body.username,
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone
        }),
        req.body.password, function (err, user) {

            if (err) {
                console.log(err);
            }
            passport.authenticate("club-signup")(req, res, function () {
                res.redirect("/");
            });
        });
});

app.post("/club_login", passport.authenticate("club-signup", {
    successRedirect: "/",
    failureRedirect: "/club_login"
}), function (req, res) {
});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// --------------------- Club Authentication ends----------------




// ---------------------- Messaging Routes ----------------------

app.get("/club/message", function (req, res) {
    res.render("club_dashboard.ejs");
});


app.post("/club/message", function (req, res) {
    Student.find({}, function (err, details) {
        if (err) {
            console.log(err);
        } else {
            details.forEach(function (info) {

                if (req.body.year.includes(info.year) && info.clubs.includes(req.user.username)) {
                    client.messages
                        .create({
                            body: req.body.message,
                            from: 'whatsapp:+14155238886',
                            to: 'whatsapp:+91' + info.phone
                        })
                        .then(message => console.log(message.sid))
                        .done();
                }

            });
            res.redirect("/club/message");
        }
    });
});




// ---------------------- Messaging Routes End -----------------






app.get("/", function (req, res) {
    res.render("home.ejs");
});










function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server Has Started!!");
});






// const accountSid = 'AC58d67c69fc3ba78554de312d1b4170bb';
// const authToken = '5809f65146d6231178b38f2e6a1af9b1';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'Hello Sanjit!',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+919537828612',
//         mediaUrl: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
//     })
//     .then(message => console.log(message.sid))
//     .done();