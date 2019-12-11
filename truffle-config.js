require('dotenv').config();

require('@babel/register');
require('@babel/polyfill');

const mnemonic = process.env.MNEMONIC;
const HDWalletProvider = require('truffle-hdwallet-provider');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');

const hdWalletStartIndex = 0;
const hdWalletAccounts = 5;

let hdWalletProvider;

const setupWallet = (
  url
) => {
  if (!hdWalletProvider) {
      hdWalletProvider = new HDWalletProvider(
          mnemonic,
          url,
          hdWalletStartIndex,
          hdWalletAccounts);
      hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider());
  }
  return hdWalletProvider;
};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    // development: {
    //   host: 'localhost',
    //   network_id: '*',
    //   port: 8545
    // },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01 // <-- Use this low gas price
    },
    development: {
      provider: () => setupWallet(
            'http://localhost:8545'
        ),
      network_id: 0x2324, // 8996
      gas: 8000000,
      gasPrice: 10000,
      from: '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260' // 0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE
    },
    // 'dev-8996': {
    //   // provider: () => {
    //   //   return new HDWalletProvider(
    //   //     'taxi music thumb unique chat sand crew more leg another off lamp',
    //   //     'http://127.0.0.1:8545'
    //   //   );
    //   // },
    //   host: '0.0.0.0',
    //   port: 8545,
    //   network_id: '8996',
    //   // 0xe2DD09d719Da89e5a3D0F2549c7E24566e947260
    //   // 0x00bd138abd70e2f00903268f3db08f2d25677c9e
    //   // 0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0
    //   // 0xA99D43d86A0758d5632313b8fA3972B6088A21BB
    //   from: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    //   gas: 4465030,
    //   gasPrice: 6000000000
    // },
    nile: {
      provider: () => {
        return new HDWalletProvider(mnemonic, 'https://nile.dev-ocean.com', 0, 5);
      },
      from: '0xbf894BDF5CFfF5944547f19e21b8c75612990C2a',
      network_id: '8995'
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY
        );
      },
      network_id: '3',
      gas: 4465030,
      gasPrice: 10000000000
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          mnemonic,
          'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY
        );
      },
      network_id: '42',
      gas: 4465030,
      gasPrice: 10000000000
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY
        ),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
    // main ethereum network(mainnet)
    main: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY
        ),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: '0.5.7',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    // reporter: 'eth-gas-reporter',
  }
};
