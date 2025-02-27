"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const outline_icons_1 = require("outline-icons");
function UnderlineIcon(props) {
    return (react_1.default.createElement(outline_icons_1.Icon, Object.assign({}, props),
        react_1.default.createElement("path", { d: "M 18 18 H 7 V 4 H 9 V 16 H 16 V 4 H 18 Z M 7 19 H 18 V 21 H 7 Z" })));
}
exports.default = UnderlineIcon;
//# sourceMappingURL=UnderlineIcon.js.map