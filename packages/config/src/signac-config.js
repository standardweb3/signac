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
        url: 'http://localhost:9650/ext/bc/C/rpc',
        typedef: undefined,
        accounts: ["0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", ]
      }
    }
  };