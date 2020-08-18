const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
    Task
} = require("./model/task");
const {
    User
} = require("./model/user");


var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);

app.use(express.static("public"));

const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/toDo";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/auth", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        userEmail: email,
    });
    console.log(user);
    if (!user)
        return res.status(400).send({
            message: "user not found",
        });

    if (password != user.password)
        return res.status(400).send({
            message: "invalid password",
        });

    res.status(200).send({
        _id: user._id,
        userEmail: user.userEmail,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

app.post("/register", async (req, res) => {
    const {
        userEmail,
        firstName,
        lastName,
        imgUrl,
        password
    } = req.body;
    console.log(userEmail, firstName, lastName, imgUrl, password);

    const user = await User.findOne({
        userEmail,
    });

    // user exists (fail condition)
    if (user)
        return res.status(400).send({
            successful: false,
        });

    //create user object
    const newObj = new User({
        userEmail,
        firstName,
        lastName,
        imgUrl,
        password,
    });
    //save to db
    await newObj.save();

    // send success
    res.status(200).send({
        successful: true,
    });
});

app.post("/api/getTasksByFamily", async (req, res) => {
    const {
        lastName
    } = req.body;
    const data = await Task.aggregate([{
            $match: {
                "user.lastName": lastName,
            },
        },
        {
            $group: {
                _id: lastName,
                tickets: {
                    $push: {
                        user: "$user",
                        _id: "_id",
                        taskTitle: "$taskTitle",
                        taskContent: "$taskContent",
                        daone: "$done",
                    },
                },
            },
        },
    ]);
    res.send(data);
});

app.delete("/api/deleteTask", async (req, res) => {});

app.put("/api/updateTask", async (req, res) => {});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("server listen on port 4000"));