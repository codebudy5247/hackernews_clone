const colors = require("colors");
const express = require("express");
const news = require("../src/models/news");
const user = require("../src/models/users");
const session = require("express-session");

const homeRouter = express.Router();

// HOME / NEW
homeRouter.get("/", (req, res) => {
    (async () => {
        const coll = await news.find().sort({ createdOn: -1 });
        res.render("home", {
            news: coll,
            session: req.session,
            title: "Home",
        });
    })();
});

// PAST
homeRouter.get("/past", (req, res) => {
    (async () => {
        try {
            const coll = await news.find().sort({ createdOn: 1 });
            res.render("home", { news: coll, title: "Past" });
        } catch (err) {
            res.send(err.message);
        }
    })();
});

// SUBMIT A POST
homeRouter.get("/submit", (req, res, next) => {
    if (req.session.user) res.render("submit", { title: "Submit" });
    else res.redirect("/login-signup");
});

// LOGIN / SIGNUP
homeRouter.get("/login-signup", (req, res, next) => {
    res.render("login-signup", { title: "Login/Sign up" });
});

// LOGIN ATTEMPT WITH CREDS
homeRouter.post("/login", (req, res, next) => {
    console.log(typeof req.body.email);
    (async () => {
        try {
            const doc = await user.find({ email: req.body.email });
            console.log(doc);
            if (!doc[0]) {
                let err = new Error("Incorrect Credentials");
                console.log(err.message.bold.red);
                res.status(400).send(err.message);
            } else if (req.body.password === doc[0].password) {
                console.log("User exists".green);
                req.session.user = doc[0]._id;
                req.session.name = doc[0].firstName;
                console.log(`User ${doc[0].firstName} Logged In`.green.bold);
                res.redirect("/");
            } else {
                let error = "Wrong Password";
                res.send(error);
            }
        } catch (err) {
            res.send(err.message);
            console.log(err.message.bold.red);
        }
    })();
});

// LOGOUT
homeRouter.get("/logout", (req, res, next) => {
    console.log(`user ${req.session.name} logged out`.bold.green)
    req.session.user = null;
    req.session.name = null;
    res.redirect("/");
});

module.exports = homeRouter;
