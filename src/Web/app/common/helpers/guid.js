"use strict";
function newGuid() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}
function gen(count) {
    var out = "";
    for (var i = 0; i < count; i++) {
        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return out;
}
exports.Guid = { newGuid: newGuid };
//# sourceMappingURL=guid.js.map