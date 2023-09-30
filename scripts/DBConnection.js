"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pgPromise = require('pg-promise');
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        this.db = new pgPromise()({
            host: '161.246.127.24',
            port: 9077,
            database: 'dbitag',
            user: 'clmtbmrw30079bsmnfdwi4ovp',
            password: 'YcVOt4I2p6X3YTDXNltyKgxN'
        });
    }
    DBConnection.getInstance = function () {
        if (!DBConnection.instance) {
            DBConnection.instance = new DBConnection();
        }
        return DBConnection.instance;
    };
    DBConnection.prototype.getDB = function () {
        return this.db;
    };
    return DBConnection;
}());
exports.default = DBConnection;
