import * as React from "react";
import { EditorView } from "prosemirror-view";
import theme from "../theme";
import { MenuItem } from "../types";
type Props = {
    tooltip: typeof React.Component | React.FC<any>;
    commands: Record<string, any>;
    view: EditorView;
    theme: typeof theme;
    items: MenuItem[];
};
declare class Menu extends React.Component<Props> {
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<{
    key?: React.Key | null | undefined;
    view: EditorView<any>;
    tooltip: typeof React.Component | React.FC<any>;
    ref?: React.Ref<Menu> | undefined;
    commands: Record<string, any>;
    items: MenuItem[];
} & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=Menu.d.ts.map