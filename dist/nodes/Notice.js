"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const toggleWrap_1 = __importDefault(require("../commands/toggleWrap"));
const Node_1 = __importDefault(require("./Node"));
class Notice extends Node_1.default {
    constructor() {
        super(...arguments);
        this.handleStyleChange = event => {
            const { view } = this.editor;
            const { tr } = view.state;
            const element = event.target;
            const { top, left } = element.getBoundingClientRect();
            const result = view.posAtCoords({ top, left });
            if (result) {
                const transaction = tr.setNodeMarkup(result.inside, undefined, {
                    style: element.value,
                });
                view.dispatch(transaction);
            }
        };
    }
    get styleOptions() {
        return Object.entries({
            info: this.options.dictionary.info,
            warning: this.options.dictionary.warning,
            tip: this.options.dictionary.tip,
        });
    }
    get name() {
        return "container_notice";
    }
    get schema() {
        return {
            attrs: {
                style: {
                    default: "info",
                },
            },
            content: "block+",
            group: "block",
            defining: true,
            draggable: true,
            parseDOM: [
                {
                    tag: "div.notice-block",
                    preserveWhitespace: "full",
                    contentElement: "div.content",
                    getAttrs: (dom) => ({
                        style: dom.dataset.style || "info",
                    }),
                },
            ],
            toDOM: node => {
                const select = document.createElement("select");
                select.addEventListener("change", this.handleStyleChange);
                this.styleOptions.forEach(([key, label]) => {
                    const option = document.createElement("option");
                    option.value = key;
                    option.innerText = label;
                    option.selected = node.attrs.style === key;
                    select.appendChild(option);
                });
                const icon = document.createElement("i");
                icon.contentEditable = "false";
                if (node.attrs.style === "tip") {
                    icon.className = "fa fa-star mt-1 mr-1 self-start";
                }
                else if (node.attrs.style === "warning") {
                    icon.className = "fa fa-exclamation-triangle mt-1 mr-1 self-start";
                }
                else {
                    icon.className = "fa fa-info-circle mt-1 mr-1 self-start";
                }
                return [
                    "div",
                    {
                        class: `notice-block ${node.attrs.style}`,
                        "data-style": node.attrs.style
                    },
                    icon,
                    ["div", { contentEditable: false, class: "notice-select" }, select],
                    ["div", { class: "content" }, 0],
                ];
            },
        };
    }
    commands({ type }) {
        return attrs => (0, toggleWrap_1.default)(type, attrs);
    }
    inputRules({ type }) {
        return [(0, prosemirror_inputrules_1.wrappingInputRule)(/^:::$/, type)];
    }
    toMarkdown(state, node) {
        state.write("\n:::" + (node.attrs.style || "info") + "\n");
        state.renderContent(node);
        state.ensureNewLine();
        state.write(":::");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_notice",
            getAttrs: tok => ({ style: tok.info }),
        };
    }
}
exports.default = Notice;
//# sourceMappingURL=Notice.js.map