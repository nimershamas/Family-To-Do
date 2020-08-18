const mongoose = require("mongoose");

const User = mongoose.model("User", {
    userEmail: String,
    firstName: String,
    lastName: String,
    imgUrl: String,
    password: String,
});


exports.User = User;