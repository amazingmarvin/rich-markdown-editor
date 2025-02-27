"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_schema_list_1 = require("prosemirror-schema-list");
const Node_1 = __importDefault(require("./Node"));
class CheckboxItem extends Node_1.default {
    constructor() {
        super(...arguments);
        this.handleChange = event => {
            const { view } = this.editor;
            const { tr } = view.state;
            const { top, left } = event.target.getBoundingClientRect();
            const result = view.posAtCoords({ top, left });
            if (result) {
                const span = event.target.parentElement;
                const li = span.parentElement;
                const wasChecked = li.className.includes("checked");
                const transaction = tr.setNodeMarkup(result.inside, undefined, {
                    checked: !wasChecked,
                });
                view.dispatch(transaction);
            }
        };
    }
    get name() {
        return "checkbox_item";
    }
    get schema() {
        return {
            attrs: {
                checked: {
                    default: false,
                },
            },
            content: "paragraph block*",
            defining: true,
            draggable: true,
            parseDOM: [
                {
                    tag: `li[data-type="${this.name}"]`,
                    getAttrs: (dom) => ({
                        checked: dom.className.includes("checked"),
                    }),
                },
            ],
            toDOM: node => {
                const div = document.createElement("div");
                div.className = "checkbox-item";
                div.tabIndex = -1;
                div.addEventListener("click", this.handleChange);
                return [
                    "li",
                    {
                        "data-type": this.name,
                        class: node.attrs.checked ? "checked" : undefined,
                    },
                    [
                        "span",
                        {
                            contentEditable: false,
                        },
                        div,
                    ],
                    ["div", 0],
                ];
            },
        };
    }
    keys({ type }) {
        return {
            Enter: (0, prosemirror_schema_list_1.splitListItem)(type),
            Tab: (0, prosemirror_schema_list_1.sinkListItem)(type),
            "Shift-Tab": (0, prosemirror_schema_list_1.liftListItem)(type),
            "Mod-]": (0, prosemirror_schema_list_1.sinkListItem)(type),
            "Mod-[": (0, prosemirror_schema_list_1.liftListItem)(type),
        };
    }
    toMarkdown(state, node) {
        state.write(node.attrs.checked ? "[x] " : "[ ] ");
        state.renderContent(node);
    }
    parseMarkdown() {
        return {
            block: "checkbox_item",
            getAttrs: tok => ({
                checked: tok.attrGet("checked") ? true : undefined,
            }),
        };
    }
}
exports.default = CheckboxItem;
//# sourceMappingURL=CheckboxItem.js.map