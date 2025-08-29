"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUrl(text) {
    if (text.match(/\n/)) {
        return false;
    }
    try {
        const url = new URL(text);
        return url.hostname !== "" || /^[a-z][a-z0-9+\-.]*:\/\/\S+$/.test(text);
    }
    catch (err) {
        return false;
    }
}
exports.default = isUrl;
//# sourceMappingURL=isUrl.js.map