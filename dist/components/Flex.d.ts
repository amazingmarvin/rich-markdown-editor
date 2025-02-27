import * as React from "react";
type JustifyValues = "center" | "space-around" | "space-between" | "flex-start" | "flex-end";
type AlignValues = "stretch" | "center" | "baseline" | "flex-start" | "flex-end";
type Props = {
    style?: React.CSSProperties;
    column?: boolean;
    align?: AlignValues;
    justify?: JustifyValues;
    auto?: boolean;
    className?: string;
    children?: React.ReactNode;
};
declare const Flex: import("styled-components").StyledComponent<"div", any, Props, never>;
export default Flex;
//# sourceMappingURL=Flex.d.ts.map