const express = require("express");
const mongoose = require("mongoose");

const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));


const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/toDo";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    userEmail: String,
    firstName: String,
    lastName: String,
    imgUrl: String,
    password: String
})

const Task = mongoose.model("Task", {
    user: {
        userEmail: String,
        firstName: String,
        lastName: String,
        imgUrl: String,
        password: String
    },
    taskTitle: String,
    taskContent: String,
    done: Boolean
});


app.post("/auth", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.find({
        email
    })

    if (!user) return res.status(400).send({
        isExists: false
    });

    if (password !== user.password) return res.status(400).send({
        message: "invalid password"
    });

    res.status(200).send({
        user
    })
})

app.post("/register", async (req, res) => {
    const {
        email,
        password,

    } = req.body;

    const user = await User.find({
        email
    })

    if (user) return res.status(400).send({
        isExists: true
    });

    //create user object

    //save to db

    // send the created object to the client

    res.status(200).send({
        user
    })
})









const port = process.env.PORT || 4000;
app.listen(port, () => (console.log("server listen on port 4000")));