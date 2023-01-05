const express = require("express");

const router = express.Router();

// USERS OBJECT
const users = {
    1: {
        id: 1,
        firstName: "Dani",
        hobbies: ["running", "gym", "videogames"],
    },
    2: {
        id: 2,
        firstName: "Jake",
        hobbies: ["motosports", "gym", "videogames"],
    },
};



// GET ALL USERS //
router.get("/", (req, res) => {
    return res.status(200).send(users);
});

// GET 1 USER //
router.get("/:id", (req, res) => {
    const id = req.params.id; //has to match the route on the line above or it'll error out
    //console.log("our userId", id);
    const user = users[id]
    //return res.status(200).send(user)

    if (user) {
        return res.status(200).send(user)
    } else {
        return res.status(404).send("user doesn't exist.")
    }
});

// POST NEW USER //
router.post("/u", (req, res) => {
    // let body = [];
    // req
    //     .on("data", (chunk) => {
    //         body.push(chunk);
    //     })
    //     .on("end", () => {
    //         body = Buffer.concat(body).toString();
    //         const newUser = JSON.parse(body);
    //         users[newUser["id"]] = newUser;
    //         if (users[newUser.id]) {
    //             console.log("users was added", users)
    //             return res.status(201).send(newUser);
    //         }
    //     });

    const user = req.body;
    users[user.id] = user;
    return res.status(201).send(user);
    console.log("This is our body", user);

});

// PUT/UPDATE USER //
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    if (id === updatedUser["id"] && users[id]) {
        users[id] == updatedUser
        return res.status(200).send(updatedUser);
    } else {
        res.status(404).send("nuh-uh")
    }

});

// DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (users[id]) {
        delete users[id]
        return res.status(200).send("your user has been deleted from the matrix")
    } else {
        return res.status(404).send("User did not exist in our database")
    };
});

module.exports = router;
