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
var bcrypt = require("bcrypt");
var DBConnection_1 = require("./DBConnection");
var Character_1 = require("./Character");
var User = /** @class */ (function () {
    function User(usernameOrEmail, password, username, email) {
        if (usernameOrEmail === void 0) { usernameOrEmail = ''; }
        if (password === void 0) { password = ''; }
        if (username === void 0) { username = ''; }
        if (email === void 0) { email = ''; }
        this._char = [];
        this.db = DBConnection_1.default.getInstance().getDB();
        if (usernameOrEmail.includes('@')) {
            this._email = usernameOrEmail;
        }
        else {
            this._username = usernameOrEmail;
        }
        this._password = password;
    }
    Object.defineProperty(User.prototype, "char", {
        get: function () {
            return this._char;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "user_id", {
        get: function () {
            return this._user_id;
        },
        set: function (value) {
            this._user_id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        set: function (value) {
            this._username = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        set: function (value) {
            this._password = value;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, values, userData, passwordMatch;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (this._email) {
                                                query = 'SELECT * FROM accounts WHERE email = $1';
                                                values = [this._email];
                                            }
                                            else if (this._username) {
                                                query = 'SELECT * FROM accounts WHERE username = $1';
                                                values = [this._username];
                                            }
                                            else {
                                                console.error('No username or email provided for login.');
                                                throw new Error('No username or email provided for login.');
                                            }
                                            return [4 /*yield*/, t.oneOrNone(query, values)];
                                        case 1:
                                            userData = _a.sent();
                                            if (!userData) {
                                                console.error('User not found.');
                                                throw new Error('User not found.');
                                            }
                                            return [4 /*yield*/, bcrypt.compare(this._password, userData.password)];
                                        case 2:
                                            passwordMatch = _a.sent();
                                            if (!passwordMatch) return [3 /*break*/, 4];
                                            this._user_id = userData.user_id;
                                            this._email = userData.email;
                                            this._username = userData.username;
                                            return [4 /*yield*/, t.none('UPDATE accounts SET last_login = NOW() WHERE user_id = $1', [userData.user_id])];
                                        case 3:
                                            _a.sent();
                                            console.log('Login successful.');
                                            return [3 /*break*/, 5];
                                        case 4:
                                            console.error('Invalid username or password.');
                                            throw new Error('Invalid username or password.');
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error logging in:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.regis = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, hashedPassword_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.db.oneOrNone('SELECT * FROM accounts WHERE username = $1 OR email = $2', [username, email])];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            console.error('User already exists.');
                            throw new Error('User already exists.');
                        }
                        if (email.length < 5 || // Minimum length of 5 characters
                            email.indexOf('@') === -1 || // Check for the presence of '@'
                            email.lastIndexOf('.') === -1 || // Check for the presence of a dot ('.')
                            email.lastIndexOf('.') < email.indexOf('@') || // Check if dot comes after '@'
                            email.lastIndexOf('.') - email.indexOf('@') === 1 // Check if there's at least one character between '@' and '.'
                        ) {
                            console.error('Invalid email.');
                            throw new Error('Invalid email.');
                        }
                        if (password.length < 8 ||
                            !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password) ||
                            !/[A-Z]/.test(password) ||
                            !/[a-z]/.test(password) ||
                            !/\d/.test(password)) {
                            console.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
                            throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
                        }
                        console.log(password);
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword_1 = _a.sent();
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, values;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            query = 'INSERT INTO accounts (username, email, password, created_on) VALUES ($1, $2, $3, NOW())';
                                            values = [username, email, hashedPassword_1];
                                            return [4 /*yield*/, t.none(query, values)];
                                        case 1:
                                            _a.sent();
                                            console.log('User registered successfully!');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error registering user:', error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getCharacters = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.user_id) {
                            console.error('User not logged in.');
                            throw new Error('User not logged in.');
                        }
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, charData, getCharPromises, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            query = 'SELECT user_id, cha_id FROM characters WHERE user_id = $1';
                                            return [4 /*yield*/, t.manyOrNone(query, user_id)];
                                        case 1:
                                            charData = _b.sent();
                                            if (!(charData && charData.length > 0)) return [3 /*break*/, 3];
                                            getCharPromises = charData.map(function (cha) {
                                                var temp = new Character_1.default(cha.user_id);
                                                temp.char_id = cha.cha_id;
                                                return temp.getChar().then(function () { return temp; });
                                            });
                                            _a = this;
                                            return [4 /*yield*/, Promise.all(getCharPromises)];
                                        case 2:
                                            _a._char = _b.sent();
                                            console.log('Character data loaded successfully.');
                                            return [3 /*break*/, 4];
                                        case 3:
                                            console.log('This user has no character.');
                                            _b.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = User;
