module.exports = {
    rust: {
      compilers: [
        {
          version: "0.5.16"
        }
      ]
    },
    networks: {
      local: {
        rpc: 'wss://localhost:9933',
        typedef: undefined,
        accounts: ["test test test test"]
      }
    }
  };