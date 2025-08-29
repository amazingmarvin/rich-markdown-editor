import Node from "./Node";
export default class Notice extends Node {
    get styleOptions(): [string, any][];
    get name(): string;
    get schema(): {
        attrs: {
            style: {
                default: string;
            };
        };
        content: string;
        group: string;
        defining: boolean;
        draggable: boolean;
        parseDOM: {
            tag: string;
            preserveWhitespace: string;
            contentElement: string;
            getAttrs: (dom: HTMLDivElement) => {
                style: string;
            };
        }[];
        toDOM: (node: any) => (string | HTMLElement | {
            class: string;
            "data-style": any;
        } | (string | HTMLSelectElement | {
            contentEditable: boolean;
            class: string;
        })[] | (string | number | {
            class: string;
        })[])[];
    };
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    handleStyleChange: (event: any) => void;
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: any) => {
            style: any;
        };
    };
}
//# sourceMappingURL=Notice.d.ts.map