"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const prosemirror_tables_1 = require("prosemirror-tables");
const isInList_1 = __importDefault(require("../queries/isInList"));
const isMarkActive_1 = __importDefault(require("../queries/isMarkActive"));
const isNodeActive_1 = __importDefault(require("../queries/isNodeActive"));
const UnderlineIcon_1 = __importDefault(require("../components/UnderlineIcon"));
function formattingMenuItems(state, isTemplate, dictionary) {
    const { schema } = state;
    const isTable = (0, prosemirror_tables_1.isInTable)(state);
    const isList = (0, isInList_1.default)(state);
    const allowBlocks = !isTable && !isList;
    return [
        {
            name: "placeholder",
            tooltip: dictionary.placeholder,
            icon: outline_icons_1.InputIcon,
            active: (0, isMarkActive_1.default)(schema.marks.placeholder),
            visible: isTemplate,
        },
        {
            name: "separator",
            visible: isTemplate,
        },
        {
            name: "strong",
            tooltip: dictionary.strong,
            icon: outline_icons_1.BoldIcon,
            active: (0, isMarkActive_1.default)(schema.marks.strong),
        },
        {
            name: "em",
            tooltip: dictionary.em,
            icon: outline_icons_1.ItalicIcon,
            active: (0, isMarkActive_1.default)(schema.marks.em),
        },
        {
            name: "underline",
            tooltip: dictionary.underline,
            icon: UnderlineIcon_1.default,
            active: (0, isMarkActive_1.default)(schema.marks.underline),
        },
        {
            name: "strikethrough",
            tooltip: dictionary.strikethrough,
            icon: outline_icons_1.StrikethroughIcon,
            active: (0, isMarkActive_1.default)(schema.marks.strikethrough),
        },
        {
            name: "code_inline",
            tooltip: dictionary.codeInline,
            icon: outline_icons_1.CodeIcon,
            active: (0, isMarkActive_1.default)(schema.marks.code_inline),
        },
        {
            name: "separator",
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.heading,
            icon: outline_icons_1.Heading1Icon,
            active: (0, isNodeActive_1.default)(schema.nodes.heading, { level: 1 }),
            attrs: { level: 1 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading2Icon,
            active: (0, isNodeActive_1.default)(schema.nodes.heading, { level: 2 }),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading3Icon,
            active: (0, isNodeActive_1.default)(schema.nodes.heading, { level: 3 }),
            attrs: { level: 3 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: dictionary.subheading,
            icon: outline_icons_1.Heading4Icon,
            active: (0, isNodeActive_1.default)(schema.nodes.heading, { level: 4 }),
            attrs: { level: 4 },
            visible: allowBlocks,
        },
        {
            name: "blockquote",
            tooltip: dictionary.quote,
            icon: outline_icons_1.BlockQuoteIcon,
            active: (0, isNodeActive_1.default)(schema.nodes.blockquote),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "bullet_list",
            tooltip: dictionary.bulletList,
            icon: outline_icons_1.BulletedListIcon,
            active: (0, isNodeActive_1.default)(schema.nodes.bullet_list),
            visible: allowBlocks,
        },
        {
            name: "checkbox_list",
            tooltip: dictionary.checkboxList,
            icon: outline_icons_1.TodoListIcon,
            active: (0, isNodeActive_1.default)(schema.nodes.checkbox_list),
            visible: allowBlocks,
        },
        {
            name: "separator",
        },
        {
            name: "link",
            tooltip: dictionary.createLink,
            icon: outline_icons_1.LinkIcon,
            active: (0, isMarkActive_1.default)(schema.marks.link),
            attrs: { href: "" },
        },
    ];
}
exports.default = formattingMenuItems;
//# sourceMappingURL=formatting.js.map