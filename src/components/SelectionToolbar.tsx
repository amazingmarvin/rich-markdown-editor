import * as React from "react";
import { Portal } from "react-portal";
import some from "lodash/some";
import { EditorView } from "prosemirror-view";
import getTableColMenuItems from "../menus/tableCol";
import getTableRowMenuItems from "../menus/tableRow";
import getTableMenuItems from "../menus/table";
import getFormattingMenuItems from "../menus/formatting";
import getImageMenuItems from "../menus/image";
import getDividerMenuItems from "../menus/divider";
import FloatingToolbar from "./FloatingToolbar";
import LinkEditor, { SearchResult } from "./LinkEditor";
import Menu from "./Menu";
import isMarkActive from "../queries/isMarkActive";
import getMarkRange from "../queries/getMarkRange";
import isNodeActive from "../queries/isNodeActive";
import getColumnIndex from "../queries/getColumnIndex";
import getRowIndex from "../queries/getRowIndex";
import createAndInsertLink from "../commands/createAndInsertLink";
import { MenuItem } from "../types";
import baseDictionary from "../dictionary";

type Props = {
  dictionary: typeof baseDictionary;
  tooltip: typeof React.Component | React.FC<any>;
  rtl: boolean;
  isTemplate: boolean;
  commands: Record<string, any>;
  onOpen: () => void;
  onClose: () => void;
  onSearchLink?: (term: string) => Promise<SearchResult[]>;
  onClickLink: (href: string, event: MouseEvent) => void;
  onCreateLink?: (title: string) => Promise<string>;
  onShowToast?: (msg: string, code: string) => void;
  view: EditorView;
};

function isVisible(props) {
  const { view } = props;
  const { selection } = view.state;

  if (!selection) return false;
  if (selection.empty) return false;
  if (selection.node && selection.node.type.name === "hr") {
    return true;
  }
  if (selection.node && selection.node.type.name === "image") {
    return true;
  }
  if (selection.node) return false;

  const slice = selection.content();
  const fragment = slice.content;
  const nodes = fragment.content;

  return some(nodes, n => n.content.size);
}

export default class SelectionToolbar extends React.Component<Props> {
  isActive = false;

  componentDidUpdate(): void {
    const visible = isVisible(this.props);
    if (this.isActive && !visible) {
      this.isActive = false;
      this.props.onClose();
    }
    if (!this.isActive && visible) {
      this.isActive = true;
      this.props.onOpen();
    }
  }

  handleOnCreateLink = async (title: string): Promise<void> => {
    const { dictionary, onCreateLink, view, onShowToast } = this.props;

    if (!onCreateLink) {
      return;
    }

    const { dispatch, state } = view;
    const { from, to } = state.selection;
    if (from === to) {
      // selection cannot be collapsed
      return;
    }

    const href = `creating#${title}…`;
    const markType = state.schema.marks.link;

    // Insert a placeholder link
    dispatch(
      view.state.tr
        .removeMark(from, to, markType)
        .addMark(from, to, markType.create({ href }))
    );

    createAndInsertLink(view, title, href, {
      onCreateLink,
      onShowToast,
      dictionary,
    });
  };

  handleOnSelectLink = ({
    href,
    from,
    to,
  }: {
    href: string;
    from: number;
    to: number;
  }): void => {
    const { view } = this.props;
    const { state, dispatch } = view;

    const markType = state.schema.marks.link;

    dispatch(
      state.tr
        .removeMark(from, to, markType)
        .addMark(from, to, markType.create({ href }))
    );
  };

  render() {
    const { dictionary, onCreateLink, isTemplate, rtl, ...rest } = this.props;
    const { view } = rest;
    const { state } = view;
    const { selection }: { selection: any } = state;
    const isCodeSelection = isNodeActive(state.schema.nodes.code_block)(state);
    const isDividerSelection = isNodeActive(state.schema.nodes.hr)(state);

    // toolbar is disabled in code blocks, no bold / italic etc
    if (isCodeSelection) {
      return null;
    }

    const colIndex = getColumnIndex(state.selection);
    const rowIndex = getRowIndex(state.selection);
    const isTableSelection = colIndex !== undefined && rowIndex !== undefined;
    const link = isMarkActive(state.schema.marks.link)(state);
    const range = getMarkRange(selection.$from, state.schema.marks.link);
    const isImageSelection =
      selection.node && selection.node.type.name === "image";

    let items: MenuItem[] = [];
    if (isTableSelection) {
      items = getTableMenuItems(dictionary);
    } else if (colIndex !== undefined) {
      items = getTableColMenuItems(state, colIndex, rtl, dictionary);
    } else if (rowIndex !== undefined) {
      items = getTableRowMenuItems(state, rowIndex, dictionary);
    } else if (isImageSelection) {
      items = getImageMenuItems(state, dictionary);
    } else if (isDividerSelection) {
      items = getDividerMenuItems(state, dictionary);
    } else {
      items = getFormattingMenuItems(state, isTemplate, dictionary);
    }

    // Some extensions may be disabled, remove corresponding items
    items = items.filter(item => {
      if (item.name === "separator") return true;
      if (item.visible === false) return false;
      if (item.name && !this.props.commands[item.name]) return false;
      return true;
    });

    if (!items.length) {
      return null;
    }

    return (
      <Portal>
        <FloatingToolbar view={view} active={isVisible(this.props)}>
          {link && range ? (
            <LinkEditor
              dictionary={dictionary}
              mark={range.mark}
              from={range.from}
              to={range.to}
              onCreateLink={onCreateLink ? this.handleOnCreateLink : undefined}
              onSelectLink={this.handleOnSelectLink}
              {...rest}
            />
          ) : (
            <Menu items={items} {...rest} />
          )}
        </FloatingToolbar>
      </Portal>
    );
  }
}
