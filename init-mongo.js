// const { db } = require("./src/database");

db.createUser({
    user: "app",
    pwd: "helloworld",
    roles: [
        {
            role: "readWrite",
            db: "linkshortener"
        }
    ]
})