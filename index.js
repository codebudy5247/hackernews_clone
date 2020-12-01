const express = require("express");
const { color } = require("colors");
const path = require("path");
const db = require("./src/database");
const session = require("express-session");
const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const newsRouter = require("./routes/news");
const exphbs = require("express-handlebars");
const dotenv =  require('dotenv').config();

// init app
const app = express();
const PORT = process.env.PORT || 5000;

// register view engine
const hbs = exphbs.create({
    helpers: {
        renderNews: function (news) {
            let hoursToMilSecs = 1 * 60 * 60 * 1000;
            let output = "";

            for (let i = 0; i < news.length; i++) {
                let tiemSinceCreation = Math.floor((Date.now() - news[i].createdOn) / hoursToMilSecs);
                output += `
                            <tr id =  ${news[i]._id}>
                                <td class="serial"> ${i + 1}.</td>
                                <td> <a href="${news[i].url}"> ${news[i].title} | </a> ${tiemSinceCreation} hours ago | ${news[i].points} pts </td>
                            </tr>
                            `;
            }
            return output;
        },
    },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// body parser
app.use(session({ secret: "mylittlesecret" }));

//bodyparser
app.use(express.urlencoded({}));
app.use(express.json());

//  middleware for consoling every request
app.use((req, res, next) => {
    console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);
    next();
});

// static public files
app.use(express.static("public"));

//  mount user routes on the application
app.use("/", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/news", newsRouter);

// listen
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
