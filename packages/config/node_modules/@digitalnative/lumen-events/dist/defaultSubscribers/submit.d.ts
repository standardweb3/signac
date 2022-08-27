declare const _default: {
    initialization: () => void;
    handlers: {
        "submit:ready": (({ assetName, price }: {
            assetName: any;
            price: any;
        }) => void)[];
        "submit:inBlock": (({ blockHash, assetName, price }: {
            blockHash: any;
            assetName: any;
            price: any;
        }) => void)[];
        "submit:success": (({ blockHash, assetName, price }: {
            blockHash: any;
            assetName: any;
            price: any;
        }) => void)[];
        "submit:fail": (({ blockHash, assetName, price, error }: {
            blockHash: any;
            assetName: any;
            price: any;
            error: any;
        }) => void)[];
    };
};
export default _default;
