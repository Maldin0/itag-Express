"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Spell = /** @class */ (function () {
    function Spell(name, interval_time, duration, range, details) {
        this.name = name;
        this.interval_time = interval_time;
        this.duration = duration;
        this.range = range;
        this.details = details;
    }
    return Spell;
}());
exports.default = Spell;
