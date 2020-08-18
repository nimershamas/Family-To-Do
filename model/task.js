const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
    user: {
        userEmail: String,
        firstName: String,
        lastName: String,
        imgUrl: String,
        password: String,
    },
    taskTitle: String,
    taskContent: String,
    done: Boolean,
});

exports.Task = Task;