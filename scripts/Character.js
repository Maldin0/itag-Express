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
var Race_1 = require("./Race");
var Class_1 = require("./Class");
var Skill_1 = require("./Skill");
var Item_1 = require("./Item");
var DBConnection_1 = require("./DBConnection");
var console_1 = require("console");
var Character = /** @class */ (function () {
    function Character(user_id) {
        this.skills = [];
        this.bag = [];
        this.status = {
            dex: 0,
            wis: 0,
            int: 0,
            str: 0,
            cha: 0,
            con: 0,
            hp: 0
        };
        this.db = DBConnection_1.default.getInstance().getDB();
        this.user_id = user_id;
    }
    Object.defineProperty(Character.prototype, "char_id", {
        get: function () {
            return this._char_id;
        },
        set: function (value) {
            this._char_id = value;
        },
        enumerable: false,
        configurable: true
    });
    Character.prototype.createChar = function (race_id, class_id, name, background, dex, wis, int, str, cha, con, hp, gold) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.user_id) {
                            console.error('User not found.');
                            throw new Error('User not found.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, value, Chadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            query = 'insert into characters(user_id,race_id,class_id,name,background,dex,wis,int,str,cha,con,hp,is_active,gold) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, false ,$13) returning cha_id';
                                            value = [this.user_id, race_id, class_id, name, background, dex, wis, int, str, cha, con, hp, gold];
                                            return [4 /*yield*/, t.one(query, value)];
                                        case 1:
                                            Chadata = _a.sent();
                                            this.active = true;
                                            this._char_id = Chadata.cha_id;
                                            console.log('Create character successfully.');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.getChar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.user_id) {
                            console.error('User not found.');
                            throw console_1.error;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, Chadata, query2, Racedata, query3, Classdata, query4, Skilldata, _i, Skilldata_1, skill, query5, Itemdata, _a, Itemdata_1, item, query6, Statdata;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            query = 'select name,gold,background,is_active from characters where cha_id = $1';
                                            return [4 /*yield*/, t.one(query, [this.char_id])];
                                        case 1:
                                            Chadata = _b.sent();
                                            this.name = Chadata.name;
                                            this.gold = Chadata.gold;
                                            this.background = Chadata.background;
                                            this.active = Chadata.is_active;
                                            query2 = 'select race_name from characters natural join races where cha_id = $1';
                                            return [4 /*yield*/, t.one(query2, [this.char_id])];
                                        case 2:
                                            Racedata = _b.sent();
                                            this.race = new Race_1.default(Racedata.race_name);
                                            return [4 /*yield*/, this.race.getTrait()];
                                        case 3:
                                            _b.sent();
                                            query3 = 'select class_name from characters natural join classes where cha_id = $1';
                                            return [4 /*yield*/, t.one(query3, [this.char_id])];
                                        case 4:
                                            Classdata = _b.sent();
                                            this.class = new Class_1.default(Classdata.class_name);
                                            return [4 /*yield*/, this.class.getfeature()];
                                        case 5:
                                            _b.sent();
                                            return [4 /*yield*/, this.class.getspell()];
                                        case 6:
                                            _b.sent();
                                            query4 = 'select skill_name,skill_detail from characters natural join  skills_in_cha natural join skills where cha_id = $1';
                                            return [4 /*yield*/, t.manyOrNone(query4, [this.char_id])];
                                        case 7:
                                            Skilldata = _b.sent();
                                            for (_i = 0, Skilldata_1 = Skilldata; _i < Skilldata_1.length; _i++) {
                                                skill = Skilldata_1[_i];
                                                this.skills.push(new Skill_1.default(skill.skill_name, skill.skill_detail));
                                            }
                                            query5 = 'select item_name,item_detail from characters natural join  inventories natural join items where cha_id = $1';
                                            return [4 /*yield*/, t.manyOrNone(query5, [this.char_id])];
                                        case 8:
                                            Itemdata = _b.sent();
                                            for (_a = 0, Itemdata_1 = Itemdata; _a < Itemdata_1.length; _a++) {
                                                item = Itemdata_1[_a];
                                                this.bag.push(new Item_1.default(item.item_name, item.item_detail));
                                            }
                                            query6 = 'select dex,wis,int,str,cha,con,hp from characters where cha_id = $1';
                                            return [4 /*yield*/, t.one(query6, [this.char_id])];
                                        case 9:
                                            Statdata = _b.sent();
                                            this.status.dex = Statdata.dex;
                                            this.status.wis = Statdata.wis;
                                            this.status.int = Statdata.int;
                                            this.status.str = Statdata.str;
                                            this.status.cha = Statdata.cha;
                                            this.status.con = Statdata.con;
                                            this.status.hp = Statdata.hp;
                                            console.log('Get character successfully.');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.add_item = function (item_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this._char_id);
                        if (!this.char_id) {
                            console.error('Character not found.');
                            throw new Error('Character not found.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, values;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            query = 'INSERT INTO inventories (cha_id, item_id) VALUES ($1, $2)';
                                            values = [this.char_id, item_id];
                                            return [4 /*yield*/, t.none(query, values)];
                                        case 1:
                                            _a.sent();
                                            console.log('Item added successfully!');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error adding item:', error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.remove_item = function (item_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.char_id);
                        if (!this.char_id) {
                            console.error('Character not found.');
                            throw new Error('Character not found.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var query, values;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            query = 'DELETE FROM inventories WHERE cha_id = $1 AND item_id = $2';
                                            values = [this.char_id, item_id];
                                            return [4 /*yield*/, t.none(query, values)];
                                        case 1:
                                            _a.sent();
                                            console.log('Item removed successfully!');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Error removing item:', error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.set_active = function (char_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.user_id) {
                    console.error('User not found.');
                    throw new Error('User not found.');
                }
                try {
                    this.db.tx(function (t) { return __awaiter(_this, void 0, void 0, function () {
                        var query, value, query2, value2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    query = 'update characters set is_active = false where user_id = $1';
                                    value = [this.user_id];
                                    return [4 /*yield*/, t.none(query, value)];
                                case 1:
                                    _a.sent();
                                    query2 = 'update characters set is_active = true where cha_id = $1';
                                    value2 = [char_id];
                                    return [4 /*yield*/, t.none(query2, value2)];
                                case 2:
                                    _a.sent();
                                    console.log('Set active successfully.');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Character.prototype.toString = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var characterInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: 
                    // TODO: Convert to string
                    return [4 /*yield*/, this.getChar()];
                    case 1:
                        // TODO: Convert to string
                        _c.sent();
                        characterInfo = "Character ID: ".concat(this.char_id, "\n        User ID: ").concat(this.user_id, "\n        Name: ").concat(this.name, "\n        Race: ").concat(((_a = this.race) === null || _a === void 0 ? void 0 : _a.name) || 'N/A', "\n        Class: ").concat(((_b = this.class) === null || _b === void 0 ? void 0 : _b.name) || 'N/A', "\n        Background: ").concat(this.background || 'N/A', "\n        Gold: ").concat(this.gold || 0, "\n        Skills: ").concat(this.skills.map(function (skill) { return "".concat(skill.name, ": ").concat(skill.details); }).join(', ') || 'N/A', "\n        Items in Bag: ").concat(this.bag.map(function (item) { return "".concat(item.name, ": ").concat(item.detail); }).join(', ') || 'N/A', "\n        Dexterity: ").concat(this.status.dex || 0, "\n        Wisdom: ").concat(this.status.wis || 0, "\n        Intelligence: ").concat(this.status.int || 0, "\n        Strength: ").concat(this.status.str || 0, "\n        Charisma: ").concat(this.status.cha || 0, "\n        Constitution: ").concat(this.status.con || 0, "\n        HP: ").concat(this.status.hp || 0);
                        return [2 /*return*/, characterInfo
                            //return this.user_id, this.race, this.class, this.name, this.gold, this.skills, this.bag, this.status.cha, this.status.con, this.status.wis, this.status.str, this.status.int, this.status.dex, this.status.hp
                        ];
                }
            });
        });
    };
    return Character;
}());
exports.default = Character;
