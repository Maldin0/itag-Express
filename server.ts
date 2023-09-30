import User from './scripts/User';
const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

let user:User = new User();

app.get("/users", async (req, res) => {
    try {
        await user.getCharacters(user.user_id)
        res.status(200).json({ user, message: "Characters retrieved successfully!" });
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
});


app.post("/users/login", async (req, res) => {
    try {
        const userData = { usernameOrEmail: req.body.usernameOrEmail, password: req.body.password };
        if (userData.usernameOrEmail.includes('@')) {
            user.email = userData.usernameOrEmail;
        } else {
            user.username = userData.usernameOrEmail;
        }
        user.password = userData.password;

        await user.login()
            .then(() => {
                
                res.status(200).json({user, message: "User logged in successfully!" });
            }).catch((err) => {
                res.status(400).send({ message: `${err}`});
            });
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
});


app.post("/users/register", async (req, res) => {
    try {
        const userData = { username: req.body.username, email: req.body.email, password: req.body.password };
    
        await user.regis(userData.username, userData.email, userData.password)
            .then(() => {
                res.status(200).send({ message: "User registered successfully!" });
            }).catch((err) => {
                res.status(400).send({ message: `${err}`});
            });
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.get("/users/logout", async (req, res) => {
    try {
        user = new User() 
        res.status(200).json({ message: "User logged out successfully!" });
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});