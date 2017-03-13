"use strict";
var EnumExtension = (function () {
    function EnumExtension() {
    }
    EnumExtension.getNamesAndValues = function (e) {
        return EnumExtension.getNames(e).map(function (n) { return ({ name: n, value: e[n] }); });
    };
    EnumExtension.getNames = function (e) {
        return EnumExtension.getObjValues(e).filter(function (v) { return typeof v === "string"; });
    };
    EnumExtension.getValues = function (e) {
        return EnumExtension.getObjValues(e).filter(function (v) { return typeof v === "number"; });
    };
    EnumExtension.getObjValues = function (e) {
        return Object.keys(e).map(function (k) { return e[k]; });
    };
    return EnumExtension;
}());
exports.EnumExtension = EnumExtension;
//# sourceMappingURL=enum.extension.js.map