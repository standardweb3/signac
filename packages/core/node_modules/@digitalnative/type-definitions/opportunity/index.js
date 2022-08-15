var _default = {
  types: [
    {
      minmax: [0, undefined],
      types: {
        AccountInfo: "AccountInfoWithTripleRefCount",
        Address: "MultiAddress",
        LookupSource: "MultiAddress",
        Account: {
          nonce: "U256",
          balance: "U256",
        },
        Transaction: {
          nonce: "U256",
          action: "String",
          gas_price: "u64",
          gas_limit: "u64",
          value: "U256",
          input: "Vec<u8>",
          signature: "Signature",
        },
        Signature: {
          v: "u64",
          r: "H256",
          s: "H256",
        },
        XCurrencyId: {
          chain_id: "ChainId",
          currency_id: "Bytes",
        },
        CurrencyIdOf: "CurrencyId",
        CurrencyId: {
          _enum: {
            Token: "TokenSymbol",
          },
        },
        TokenSymbol: {
          _enum: ["ACA", "AUSD", "DOT", "XBTC", "LDOT", "RENBTC", "SDN", "PLM"],
        },
        AmountOf: "Amount",
        Amount: "i128",
        DataVersion: "u64",
        RequestIdentifier: "u64",
        SpecIndex: "Vec<u8>",
        CDP: {
          liquidation_fee: "Balance",
          max_collateraization_rate: "U256",
          stability_fee: "Balance",
        },
        SocketIndex: "i32",
        Currency: "Balances",
        BridgeChainId: "u8",
        ResourceId: "[u8; 32]",
        DepositNonce: "u64",
        ProposalVotes: {
          votes_for: "Vec<AccountId>",
          votes_against: "Vec<AccountId>",
          status: "enum",
        },
        Erc721Token: {
          id: "TokenId",
          metadata: "Vec<u8>",
        },
        TokenId: "U256",
      },
    },
  ],
};

module.exports = _default;
