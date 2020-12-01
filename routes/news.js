
const colors = require("colors");
const express = require("express");
const news = require("../src/models/news");

const newsRouter = express.Router();

// CREATE
newsRouter.post("/", (req, res, next) => {
    console.log(req.body);
    if (!req.body.title || !req.body.url ) {
        console.log("Improper Format".bold.red)
        res.status(400).send("Improper Format");
    }
    (async () => {
        try {
            const count = await news.countDocuments();
            let newNews = new news({
                index: count + 1,
                title: req.body.title,
                createdOn: Date(),
                addedBy: req.session.user,
                url: req.body.url,
                points: 0,
            });

            const doc = await newNews.save();
            res.redirect("/");
        } catch (err) {
            console.log(err.message.bold.red);
        }
    })();
});

// READ
newsRouter.get("/:index", (req, res, next) => {
    req.params.index = parseInt(req.params.index);

    (async () => {
        try {
            const doc = await news.find({ index: req.params.index });
            if (!doc.length) {
                res.status(400).send("NOT FOUND");
            } else {
                res.send(doc);
                console.log(doc);
            }
        } catch (err) {
            res.status(400).send(err.message);
            console.log(err.message.red.bold);
        }
    })();
});

// UPDATE
newsRouter.patch("/:index", (req, res, next) => {
    // Updating title and URL
    // Enter Both
    req.params.index = parseInt(req.params.index);
    (async () => {
        try {
            const updated = await news.findOneAndUpdate(
                { index: req.params.index },
                {
                    title: req.body.title,
                    url: req.body.url,
                },
                {
                    new: true,
                }
            );
            res.send(updated);
        } catch (err) {
            res.send(err.message);
        }
    })();
});

// DELETE
module.exports = newsRouter;
