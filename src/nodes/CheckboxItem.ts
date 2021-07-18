import {
  splitListItem,
  sinkListItem,
  liftListItem,
} from "prosemirror-schema-list";
import Node from "./Node";

export default class CheckboxItem extends Node {
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
          getAttrs: (dom: HTMLLIElement) => ({
            checked: dom.className.includes("checked"),
          }),
        },
      ],
      toDOM: node => {
        // This will be styled manually in CSS
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

  handleChange = event => {
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

  keys({ type }) {
    return {
      Enter: splitListItem(type),
      Tab: sinkListItem(type),
      "Shift-Tab": liftListItem(type),
      "Mod-]": sinkListItem(type),
      "Mod-[": liftListItem(type),
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
