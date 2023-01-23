const mongoose = require("mongoose");

const url = process.env.MONGO_DB_CONNECTION_STRING
const mongoUser = process.env.MONGO_DB_USER
const mongoPassword = process.env.MONGO_DB_PASSWORD
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { authdb: "admin" },
    user: mongoUser,
    pass: mongoPassword,
})
    .then(db => {
        console.log("connected to db")
        module.exports.db = db;
    })
    .catch(err => {
        console.log(err)
    });
module.exports.connect = connect;
module.exports.mongoose = mongoose;
