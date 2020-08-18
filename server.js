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

    const user = await User.findOne({
        userEmail: email
    })

    if (!user) return res.status(400).send({
        message: "user not found"
    });

    if (password != user.password) return res.status(400).send({
        message: "invalid password"
    });

    res.status(200).send({
        _id: user._id,
        userEmail: user.userEmail,
        firstName: user.firstName,
        lastName: user.lastName,
    })
})

app.post("/register", async (req, res) => {
    const {
        userEmail,
        firstName,
        lastName,
        imgUrl,
        password

    } = req.body;
    console.log(userEmail,
        firstName,
        lastName,
        imgUrl,
        password
    );

    const user = await User.findOne({
        userEmail
    })

    // user exists (fail condition)
    if (user) return res.status(400).send({
        successful: false
    });

    //create user object
    const newObj = new User({
        userEmail,
        firstName,
        lastName,
        imgUrl,
        password
    })
    //save to db
    await newObj.save();

    // send success 
    res.status(200).send({
        successful: true
    })
})

app.get("/api/getTasksByFamily", async (req, res) => {
    const {
        lastName
    } = req.body;
    const data = await Task.aggregate([{
        $match: {
            "user.lastName": lastName
        }
    }, {
        $group: {
            _id: lastName,
            firstName: "rawad",
            tickets: {
                $push: {
                    user: "$user",
                    _id: "_id",
                    taskTitle: "$taskTitle",
                    taskContent: "$taskContent",
                    daone: "$done"
                }
            }
        },
    }, ]);
    console.log(data[0].tickets[1]);
})

// const task1 = new Task({
//     user: {
//         userEmail: "rami@gmail.com",
//         firstName: "rami",
//         lastName: "sabik",
//         imgUrl: "data:image/jpeg;base64,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",
//         password: "123456",
//     },
//     taskTitle: "Hello there",
//     taskContent: "How are you?",
//     done: false
// })

// task1.save().then(data => data)









const port = process.env.PORT || 4000;
app.listen(port, () => (console.log("server listen on port 4000")));