const colors = require("colors");
const express = require("express");
const user = require("../src/models/users");

const userRouter = express.Router();

// All Users (READ)
userRouter.get("/", (req, res, next) => {
    user.find()
        .then((coll) => res.status(200).send(coll))
        .catch((err) => res.status(400).send(err.message));

});

// Generating Persistent user data (CREATE)
userRouter.post("/", (req, res) => {
    let user1 = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        createdOn: Date(),
        password: req.body.password,
    });

    (async () => {
        try {
            const doc = await user1.save();
            res.send("USER SUCCESSFULLY CREATED. YOU CAN LOGIN NOW");
            console.log("User Added".green.bold);
        } catch (err) {
            res.send(err.message);
            console.log(err.message.red.bold);
        }
    })();
});

// Accessing user data usign 'firstname (READ)
userRouter.get("/:firstname", (req, res, next) => {
    console.log(req.params.firstname);
    user.find({ firstName: req.params.firstname })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err.message));
});

// Updating user details using _id (UPDATE)
userRouter.patch("/:id", (req, res, next) => {
    (async () => {
        try {
            const doc = await user.findOneAndUpdate(
                { _id: req.params.id },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                },
                { new: true, runValidators: true, useFindAndModify: true }
            );
            res.send(doc);
            console.log(doc);
        } catch (err) {
            res.send(err.message);
            console.log(err.message.red.bold);
        }
    })();
});

// Deleting a user using the _id attr (DELETE)
userRouter.delete("/:id", (req, res, next) => {
    user.findOneAndDelete({ id: req.params.id })
        .then((doc) => res.send("User Deleted"))
        .catch((err) => res.send(err.message));
});

module.exports = userRouter;
