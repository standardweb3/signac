module.exports = {
    solidity: {
      compilers: [
        {
          version: "0.5.16"
        },
        {
          version: "0.6.2"
        },
        {
          version: "0.6.4"
        },
        {
          version: "0.7.0"
        },
        {
          version: "0.8.0"
        }
      ]
    },
    networks: {
      hardhat: {
        gasPrice: 470000000000,
        chainId: 43112,
      },
      avash: {
        url: 'http://localhost:9650/ext/bc/C/rpc',
        gasPrice: 470000000000,
        chainId: 43112,
        accounts: ["0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027", 
      ]
      },
      fuji: {
        url: 'https://api.avax-test.network/ext/bc/C/rpc',
        gasPrice: 470000000000,
        chainId: 43113,
        accounts: [
      ]
      },
      mainnet: {
        url: 'https://api.avax.network/ext/bc/C/rpc',
        gasPrice: 470000000000,
        chainId: 43114,
        accounts: [
      ]
      }
    }
  };