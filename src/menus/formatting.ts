import {
  BoldIcon,
  BulletedListIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
  InputIcon,
} from "outline-icons";
import { isInTable } from "prosemirror-tables";
import { EditorState } from "prosemirror-state";
import isInList from "../queries/isInList";
import isMarkActive from "../queries/isMarkActive";
import isNodeActive from "../queries/isNodeActive";
import { MenuItem } from "../types";
import baseDictionary from "../dictionary";
import UnderlineIcon from "../components/UnderlineIcon";

// Name must be one of:
// ["doc", "text", "br", "paragraph", "blockquote", "code_block", "code_fence",
// "checkbox_list", "checkbox_item", "bullet_list", "embed", "list_item",
// "container_notice", "heading", "hr", "downloadImage", "deleteImage",
// "alignRight", "alignLeft", "alignCenter", "createImage", "createTable",
// "setColumnAttr", "addColumnBefore", "addColumnAfter", "deleteColumn",
// "addRowAfter", "deleteRow", "deleteTable", "toggleHeaderColumn",
// "toggleHeaderRow", "toggleHeaderCell", "setCellAttr", "fixTables", "td",
// "th", "tr", "strong", "code_inline", "highlight", "em", "placeholder",
// "underline", "link", "strikethrough", "ordered_list", "history",
// "smart_text", "trailing_node", "markdown-paste", "keys", "blockmenu",
// "empty-placeholder", "maxlength"]
export default function formattingMenuItems(
  state: EditorState,
  isTemplate: boolean,
  dictionary: typeof baseDictionary
): MenuItem[] {
  const { schema } = state;
  const isTable = isInTable(state);
  const isList = isInList(state);
  const allowBlocks = !isTable && !isList;

  return [
    {
      name: "placeholder",
      tooltip: dictionary.placeholder,
      icon: InputIcon,
      active: isMarkActive(schema.marks.placeholder),
      visible: isTemplate,
    },
    {
      name: "separator",
      visible: isTemplate,
    },
    {
      name: "strong",
      tooltip: dictionary.strong,
      icon: BoldIcon,
      active: isMarkActive(schema.marks.strong),
    },
    {
      name: "em",
      tooltip: dictionary.em,
      icon: ItalicIcon,
      active: isMarkActive(schema.marks.em),
    },
    {
      name: "underline",
      tooltip: dictionary.underline,
      icon: UnderlineIcon,
      active: isMarkActive(schema.marks.underline),
    },
    {
      name: "strikethrough",
      tooltip: dictionary.strikethrough,
      icon: StrikethroughIcon,
      active: isMarkActive(schema.marks.strikethrough),
    },
    {
      name: "code_inline",
      tooltip: dictionary.codeInline,
      icon: CodeIcon,
      active: isMarkActive(schema.marks.code_inline),
    },
    {
      name: "separator",
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.heading,
      icon: Heading1Icon,
      active: isNodeActive(schema.nodes.heading, { level: 1 }),
      attrs: { level: 1 },
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading2Icon,
      active: isNodeActive(schema.nodes.heading, { level: 2 }),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading3Icon,
      active: isNodeActive(schema.nodes.heading, { level: 3 }),
      attrs: { level: 3 },
      visible: allowBlocks,
    },
    {
      name: "blockquote",
      tooltip: dictionary.quote,
      icon: BlockQuoteIcon,
      active: isNodeActive(schema.nodes.blockquote),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "bullet_list",
      tooltip: dictionary.bulletList,
      icon: BulletedListIcon,
      active: isNodeActive(schema.nodes.bullet_list),
      visible: allowBlocks,
    },
    {
      name: "separator",
    },
    {
      name: "link",
      tooltip: dictionary.createLink,
      icon: LinkIcon,
      active: isMarkActive(schema.marks.link),
      attrs: { href: "" },
    },
  ];
}
