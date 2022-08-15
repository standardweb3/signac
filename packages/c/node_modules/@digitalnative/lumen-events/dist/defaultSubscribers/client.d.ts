declare const _default: {
    initialization: () => void;
    handlers: {
        "client:start": (() => void)[];
        "client:init": (() => void)[];
        "client:next": (() => void)[];
        "client:wait": (() => void)[];
        "client:fail": (({ error }: {
            error: any;
        }) => void)[];
    };
};
export default _default;
