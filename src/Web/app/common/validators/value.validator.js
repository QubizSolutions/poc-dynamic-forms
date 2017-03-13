"use strict";
exports.minValueValidator = function (min) {
    return function (control) {
        var num = +control.value;
        if (isNaN(num) || num < min) {
            return {
                minValue: { valid: false }
            };
        }
        return null;
    };
};
//# sourceMappingURL=value.validator.js.map