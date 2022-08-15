declare const _default: {
    initialization: () => void;
    handlers: {
        "hunt:start": (() => void)[];
        "hunt:init": (() => void)[];
        "hunt:next": (() => void)[];
        "hunt:scan": (({ vaults }: {
            vaults: any;
        }) => void)[];
        "hunt:vault": (({ i, vaultAddr, collateral, debt, cAmount, dAmount, mcr, lfr, sfr, on, status, HP, }: {
            i: any;
            vaultAddr: any;
            collateral: any;
            debt: any;
            cAmount: any;
            dAmount: any;
            mcr: any;
            lfr: any;
            sfr: any;
            on: any;
            status: any;
            HP: any;
        }) => void)[];
        "hunt:vaultSafe": (() => void)[];
        "hunt:vaultLiquidated": (() => void)[];
        "hunt:vaultFail": (() => void)[];
        "hunt:liquidateSuccess": (() => void)[];
        "hunt:fail": (({ error }: {
            error: any;
        }) => void)[];
        "hunt:networkChange": (({ link }: {
            link: any;
        }) => void)[];
    };
};
export default _default;
