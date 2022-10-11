declare const _default: {
    initialization: () => void;
    handlers: {
        "fetch:start": (({ symbol }: {
            symbol: any;
        }) => void)[];
        "fetch:succeed": (({ symbol, price }: {
            symbol: any;
            price: any;
        }) => void)[];
        "fetch:fail": (({ symbol, why }: {
            symbol: any;
            why: any;
        }) => void)[];
    };
};
export default _default;
