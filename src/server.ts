import User from './scripts/User';
import Character from './scripts/Character';
import { Request, Response } from 'express';
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());

let user:User = new User();

app.get("/users", async (req: Request, res: Response) => {
    try {
        await user.getCharacters(user.user_id)
        res.status(200).json({ username: `${user.username}`,message: "Characters retrieved successfully!" });
    } catch (error) {
        res.status(401).send({ message: `${error}` });
    }
});


app.post("/users/login", async (req: Request, res: Response) => {
    try {
        const userData = {
            usernameOrEmail: req.body.usernameOrEmail,
            password: req.body.password
        };
        console.log(req.body)
        user = new User(userData.usernameOrEmail, userData.password);
        await user.login()
            .then(() => {
    
                res.status(200).send({status: "Success", message: "User logged in successfully!" });
            }).catch((err) => {
                res.status(401).send({status: "Fail", message: `${err}`});
            });
    } catch (error) {
        res.status(500).send({ status: "Fail", message: `${error}` });
    }
});


app.post("/users/register", async (req: Request, res: Response) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        user = new User();
        await user.regis(userData.username, userData.email, userData.password)
            .then(() => {
                res.status(200).send({ status: "Success", message: "User registered successfully!" });
            }).catch((err) => {
                res.status(401).send({ status: "Fail", message: `${err}` });
            });
    } catch (error) {
        res.status(500).send({ status: "Fail", message: `${error}` });
    }
});

app.get("/users/logout", async (req: Request, res: Response) => {
    try {
        user = new User() 
        res.status(200).send({ message: "User logged out successfully!" });
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.post("/users/characters/create", async (req: Request, res: Response) => { 
    try {
        console.log(req.body);
        const charData = {
            race_id: req.body.race_id,
            class_id: req.body.class_id,
            name: req.body.name,
            background: req.body.background,
            dex: req.body.dex,
            wis: req.body.wis,
            int: req.body.int,
            str: req.body.str,
            cha: req.body.cha,
            con: req.body.con,
            hp: req.body.hp,
            gold: req.body.gold
        };
        await user.createChar(
            charData.race_id,
            charData.class_id,
            charData.name,
            charData.background,
            charData.dex,
            charData.wis,
            charData.int,
            charData.str,
            charData.cha,
            charData.con,
            charData.hp,
            charData.gold
        ).then(() => {
            res.status(200).send({ status: "Success", message: "Character created successfully!" });
        }).catch((err) => {
            res.status(401).send({ status: "Fail", message: `${err}` });
        });
    } catch (error) {
        res.status(500).send({ status: "Fail", message: `${error}`});
    }
});

app.post("/users/characters/add_item", async (req: Request, res: Response) => {
    try {
        const charData = {
            item_id: req.body.item_id,
            char_id: req.body.char_id
        };

        const char = new Character(user.user_id);
        char.char_id = charData.char_id;

        await char.add_item(charData.item_id)
            
        await char.getChar()
            .then(() => {
                res.status(200).json({ status: "Success", message: "Item added successfully!" });
            }).catch ((err) => {
                res.status(401).send({ status: "Fail", message: `${err}` });
            })
    } catch (error) {
        res.status(500).send({ status:"Fail", message: `${error}`});
    }
});

app.post("/users/characters/remove_item", async (req: Request, res: Response) => {
    try {
        const charData = {
            item_id: req.body.item_id,
            char_id: req.body.char_id
        };
        const char = new Character(user.user_id);
        char.char_id = charData.char_id;
        console.log(req.body);
        await char.remove_item(charData.item_id)
        await char.getChar()
            .then(() => {
                res.status(200).json({ status:"Success", message: "Item removed successfully!" });
            }).catch((err) => {
                res.status(401).send({ status:"Fail", message: `${err}` });
            });
    } catch (error) {
        res.status(500).send({ status:"Fail", message: `${error}` });
    }
});

app.post("/users/characters/set_active", async (req: Request, res: Response) => {
    try {
        const charData = {
            char_id: req.body.char_id
        };

        const char = new Character(user.user_id);
        char.char_id = charData.char_id;

        await char.set_active(charData.char_id)
        await char.getChar()
            .then(() => {
                res.status(200).json({status: "Fail", message: "Character set active successfully!" });
            }).catch((err) => {
                res.status(400).send({status: "Fail", message: `${err}` });
            });
    } catch (error) {
        res.status(500).send({status: "Fail", message: `${error}` });
    }
});

app.get("/users/data", async (req: Request, res: Response) => {
    try {
        const temp = new User();
        temp.username = user.username;
        temp.email = user.email;
        temp.user_id = user.user_id;
        await temp.getCharacters(user.user_id)
        res.status(200).json({ user: temp, message: "User data retrieved successfully!" });
    } catch (error) {
        res.status(401).send({ message: `${error}` });
    }
 });

 app.post("/users/characters/delete", async (req: Request, res: Response) => {
    try {
        await user.deleteChar(req.body.char_id)
        res.status(200).json({ status: "Success",message: "Character deleted successfully!" });
    } catch (error) {
        res.status(401).send({ message: `${error}` });
    }
 })

app.listen(PORT, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});