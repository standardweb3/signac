# Signac

![](https://raw.githubusercontent.com/standardweb3/signac/main/media/signac_logo.png)

---
![Proudly built for Ink!](https://raw.githubusercontent.com/paritytech/ink/bb4104ec423c34ff863d8d2eb619f10f4962b570/.images/built-for-ink.svg)


*Signac is a development environment to compile, deploy, test, and debug your unstoppable apps. Get ink! contract deployed in unstoppable app ecosystem.*


## Getting started

- :book: Try quickstart tutorial for Ink! smart contract development in [documentation]()
- :question: Ask question in our [Discord](https://discord.gg/v2HeWgsfhz)

## Prerequisites

- :gear: [NodeJS](https://nodejs.org/) 
- :crab: [Rust](https://www.rust-lang.org/)
- :toolbox: [Yarn](https://yarnpkg.com/)/[Nx](https://nx.dev)/[Cargo Contract](https://github.com/paritytech/cargo-contract)

###### Developer Quickstart:

```bash
yarn bootstrap
node ./dist/package/core/src/index.js --help
```

## Architecture Overview

- :package: This mono-repository contains a suite of smart contract framework.
- :balance_scale: The mono-repository is released under [Apache 2.0 license](./LICENSE). Note, that the packages contain their own licenses.

| Package        | Version                                                                                             | License                                                                                                              | Docs                                                                             | Description                                 |
|----------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|---------------------------------------------|
| @signac/core   | [![npm](https://img.shields.io/npm/v/@signac/core)](https://www.npmjs.com/package/@signac/core)     | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue)](./packages/core)    | Core CLI package of Signac framework        |
| @signac/init   | [![npm](https://img.shields.io/npm/v/@signac/init)](https://www.npmjs.com/package/@signac/init)     | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue) ](./packages/init)   | Initializes Signac smart contract framework |
| @signac/config | [![npm](https://img.shields.io/npm/v/@signac/config)](https://www.npmjs.com/package/@signac/config) | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue) ](./packages/config) | Configuration utility for Signac framework  |
| @signac/events | [![npm](https://img.shields.io/npm/v/@signac/config)](https://www.npmjs.com/package/@signac/events) | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue) ](./packages/events) | Event emitter for Signac framework          |
| @signac/error  | [![npm](https://img.shields.io/npm/v/@signac/error)](https://www.npmjs.com/package/@signac/error)   | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue) ](./packages/error)  | Error handler for Signac framework          |
| nxink          | [![npm](https://img.shields.io/npm/v/nxink)](https://www.npmjs.com/package/nxink)                   | [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) | [![documentation](https://img.shields.io/badge/readme-blue) ](./packages/nxink)  | Nx plugin which is used in the workspace    |

## Contributors

Read our [contributors document](/CONTRIBUTING.md), [submit an issue](https://github.com/standardweb3/signac/issues/new/choose) or talk to us on our [Discord](https://discord.gg/yjyvFRP)!

## Meetings

Weekly contributor meetings are public and announced on Discord. Feel free to check out our meeting notes and documents on [HackMD](https://hackmd.io/@wemeetagain/rJTEOdqPS/%2FXBzvaQgMTyyMJuToWAEDjw). Post-September 2021, meeting notes can be found on the [Lodestar Wiki Page](https://github.com/ChainSafe/lodestar/wiki).

## Donations

We are a local group of Toronto open-source developers. As such, all of our open-source work is funded by grants. We all take the time out of our hectic lives to contribute to the Ethereum ecosystem.
If you want to donate, you can send us ETH at the following address: `lodestar.chainsafe.eth`

