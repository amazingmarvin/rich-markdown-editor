"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize_observer_1 = require("@juggle/resize-observer");
const react_1 = require("react");
function useComponentSize(ref) {
    const [size, setSize] = (0, react_1.useState)({
        width: 0,
        height: 0,
    });
    (0, react_1.useEffect)(() => {
        const sizeObserver = new resize_observer_1.ResizeObserver(entries => {
            entries.forEach(({ target }) => {
                if (size.width !== target.clientWidth ||
                    size.height !== target.clientHeight) {
                    setSize({ width: target.clientWidth, height: target.clientHeight });
                }
            });
        });
        sizeObserver.observe(ref.current);
        return () => sizeObserver.disconnect();
    }, [ref]);
    return size;
}
exports.default = useComponentSize;
//# sourceMappingURL=useComponentSize.js.map