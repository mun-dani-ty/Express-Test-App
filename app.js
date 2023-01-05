
const express = require('express');
const logger = require("morgan");

const indexRouter = require("./routes/index.js")
const usersRouter = require("./routes/users.js")


// Create the Express app.
const app = express();
const port = 5000;

//console.log("our express app", app);
// ------------------------------------------ middleware
app.use(express.json());
app.use(logger("dev"));
app.use("/", indexRouter);
app.use("/users", usersRouter);


// // GET ROUTE // - moved to index.js
// app.get('/', (req, res) => {
//     return res.status(200).send('Welcome to our Express App')
// });

//moved user and user actions to users.js

// ------------------------------------------ 404 handling routes
app.use((req, res, next), => {
    const err = new Error("sorry, the requested resource was not found.");
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message || 'Something went wrong',
        statusCode
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
