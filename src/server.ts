import User from './scripts/User';
import Character from './scripts/Character';
const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

let user:User = new User();

app.get("/users", async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user: User; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        await user.getCharacters(user.user_id)
        res.status(200).json({ user, message: "Characters retrieved successfully!" });
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
});


app.post("/users/login", async (req: { body: { usernameOrEmail: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user: User; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        const userData = {
            usernameOrEmail: req.body.usernameOrEmail,
            password: req.body.password
        };
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


app.post("/users/register", async (req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
    
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

app.get("/users/logout", async (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        user = new User() 
        res.status(200).send({ message: "User logged out successfully!" });
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.post("/users/characters/create", async (req: { body: { race_id: any; class_id: any; name: any; background: any; dex: any; wis: any; int: any; str: any; cha: any; con: any; hp: any; gold: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { char: Character; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => { 
    try {
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

        let char = new Character(user.user_id);
        await char.createChar(
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
            charData.gold)
            
        await char.getChar()
            .then(() => {
                res.status(200).json({ char, message: "Character created successfully!" });
            }).catch((err) => {
                res.status(400).send({ message: `${err}`});
            });
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.post("/users/characters/add_item", async (req: { body: { item_id: any; char_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { char: Character; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
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
                res.status(200).json({ char, message: "Item added successfully!" });
            }).catch ((err) => {
                res.status(400).send({ message: `${err}` });
            })
    } catch (error) {
        res.status(500).send({ message: `${error}`});
    }
});

app.post("/users/characters/remove_item", async (req: { body: { item_id: any; char_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { char: Character; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        const charData = {
            item_id: req.body.item_id,
            char_id: req.body.char_id
        };

        const char = new Character(user.user_id);
        char.char_id = charData.char_id;

        await char.remove_item(charData.item_id)
        await char.getChar()
            .then(() => {
                res.status(200).json({ char, message: "Item removed successfully!" });
            }).catch((err) => {
                res.status(400).send({ message: `${err}` });
            });
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
});

app.post("/users/characters/set_active", async (req: { body: { char_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { char: Character; message: string; }): void; new(): any; }; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        const charData = {
            char_id: req.body.char_id
        };

        const char = new Character(user.user_id);
        char.char_id = charData.char_id;

        await char.set_active(charData.char_id)
        await char.getChar()
            .then(() => {
                res.status(200).json({ char, message: "Character set active successfully!" });
            }).catch((err) => {
                res.status(400).send({ message: `${err}` });
            });
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});