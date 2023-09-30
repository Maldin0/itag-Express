"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./scripts/User");
var Character_1 = require("./scripts/Character");
var express = require("express");
var app = express();
var PORT = 8080;
app.use(express.json());
var user = new User_1.default();
app.get("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getCharacters(user.user_id)];
            case 1:
                _a.sent();
                res.status(200).json({ user: user, message: "Characters retrieved successfully!" });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send({ message: "".concat(error_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/users/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userData = {
                    usernameOrEmail: req.body.usernameOrEmail,
                    password: req.body.password
                };
                if (userData.usernameOrEmail.includes('@')) {
                    user.email = userData.usernameOrEmail;
                }
                else {
                    user.username = userData.usernameOrEmail;
                }
                user.password = userData.password;
                return [4 /*yield*/, user.login()
                        .then(function () {
                        res.status(200).json({ user: user, message: "User logged in successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send({ message: "".concat(error_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/users/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                };
                return [4 /*yield*/, user.regis(userData.username, userData.email, userData.password)
                        .then(function () {
                        res.status(200).send({ message: "User registered successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send({ message: "".concat(error_3) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/users/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user = new User_1.default();
            res.status(200).send({ message: "User logged out successfully!" });
        }
        catch (error) {
            res.status(500).send({ message: "".concat(error) });
        }
        return [2 /*return*/];
    });
}); });
app.post("/users/characters/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charData, char_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                charData = {
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
                char_1 = new Character_1.default(user.user_id);
                return [4 /*yield*/, char_1.createChar(charData.race_id, charData.class_id, charData.name, charData.background, charData.dex, charData.wis, charData.int, charData.str, charData.cha, charData.con, charData.hp, charData.gold)];
            case 1:
                _a.sent();
                return [4 /*yield*/, char_1.getChar()
                        .then(function () {
                        res.status(200).json({ char: char_1, message: "Character created successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).send({ message: "".concat(error_4) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/users/characters/add_item", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charData, char_2, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                charData = {
                    item_id: req.body.item_id,
                    char_id: req.body.char_id
                };
                char_2 = new Character_1.default(user.user_id);
                char_2.char_id = charData.char_id;
                return [4 /*yield*/, char_2.add_item(charData.item_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, char_2.getChar()
                        .then(function () {
                        res.status(200).json({ char: char_2, message: "Item added successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).send({ message: "".concat(error_5) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/users/characters/remove_item", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charData, char_3, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                charData = {
                    item_id: req.body.item_id,
                    char_id: req.body.char_id
                };
                char_3 = new Character_1.default(user.user_id);
                char_3.char_id = charData.char_id;
                return [4 /*yield*/, char_3.remove_item(charData.item_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, char_3.getChar()
                        .then(function () {
                        res.status(200).json({ char: char_3, message: "Item removed successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).send({ message: "".concat(error_6) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/users/characters/set_active", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var charData, char_4, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                charData = {
                    char_id: req.body.char_id
                };
                char_4 = new Character_1.default(user.user_id);
                char_4.char_id = charData.char_id;
                return [4 /*yield*/, char_4.set_active(charData.char_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, char_4.getChar()
                        .then(function () {
                        res.status(200).json({ char: char_4, message: "Character set active successfully!" });
                    }).catch(function (err) {
                        res.status(400).send({ message: "".concat(err) });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).send({ message: "".concat(error_7) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
