# How to contribute to Signac

The following information provides a set of guidelines for contributing to the Signac repo. Use your best judgment, and, if you see room for improvement, please propose changes to this document.

Contributions come in the form of writing documentation, raising issues, and any other actions that help develop the Standard protocol documentation.

## Just want to ask a question?

Please don't submit a pull request to ask a question. Instead, join us in the following communities, and ask all your questions.

- [Standard Telegram community](https://t.me/standard_protocol)
- [Standard Discord community](https://discord.gg/qw9PZEavCC)


## Want to contribute to the framework?

### First steps

The first step is to find an issue you want to fix. To identify issues we think are good for first-time contributors, we add the **good first issue** label.

If you find an existing issue that you want to work on or if you have a new issue to create, understand the workflow expected by maintainers of the Signac repository.

### Understand framework structure

Signac consists of a task manager and its nx plugin packages that provides operating functions in nx monorepo project. Nx plugin(nxink) includes generators for setting up a each contract in monorepo and components for developing a dapp in ink! smart contract. Executors include commands that can be executed in nx for each distinct project in the monorepo. Other packages are parts to build a general task manager.

General task manager's entry point is located in `core` package. Core package is provided with `builtin` commands that are executed as default in each Signac workspace. `task` provides a library that developers can make their own deployment or interaction script in a Signac workspace.

Nx plugin located in `nxink` packages defines available commands for each distinct contract in Signac workspace. It also defines generators that can create new kind of contract or ccomponent in Signac workspace. Codes in `generators` includes file for each contract to initialize on creation, and codes in `executors` includes commands that interacts with each contract in the Signac workspace.

### Test framework codebase

> :warning: **Warning!**
> **If you are trying to build tests and contribute to the codebase, you need to have these skills:**
> - ***Setting up jest test env with its config file `jest.config.js`***
> - ***Extensive knowledge of [Nx monorepo framework](https://nx.dev/)***
> - ***Installing [Node.js](https://nodejs.org/en/) and managing versions***
> *Otherwise, you may become grumpy and end up rage quitting the contribution to the codebase*. 


First run `yarn` to install nx packages to operate with each package in the monorepo. 

Then you need to download dependancies of each package in the Nx monorepo. There is a script to bootstrap each package of Signac. Run with the command in the project root:

```
yarn bootstrap
```

To test each package of Signac, look up each directory in the `packages` folder of the root directory, then run command:

```
nx test <directory>
```

If you want to run the test as whole, run command in the framework root directory:

```
yarn test
```

To debug after editing the codebase in each package so that you can get your hands dirty, run `ts-node` installed in the package after running `yarn`.
For example, assuming the testing package is a command, run in the root directory:

```
cd packages/core/src
yarn
npx ts-node index.ts
```

###### Troubleshooting



#### Hardhat task vs Signac task

Hardhat's task has made its own domain-specific-language to execute certain task focused only on ethereum. This requires developers to understand its domain specific language to build plugins. Meanwhile, Signac's task is not bound to specific use case of the domain language. It is just a pure javascript extension of `commander.js` that implements simple CLI, in which it can be integrated with other libraries easily without going through domain language parser. 

### Propose framework changes

Signac requires everyone, without exception, to submit doc-change proposals by using a pull request (PR). PRs enable contributions from the community, easy testing, and straightforward peer review.

To contribute a doc-change proposal, use the following workflow:

1. [Fork the repository](https://github.com/standardweb3/docs).
2. [Add an upstream](https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) so that you can update your fork.
3. Clone your fork to your computer.
4. Create a branch and name it appropriately.
5. Work on only one change in one pull request.
6. Follow these conventions:

    1. Make your changes adhering to the [Signac Style Guide](https://github.com/standardweb3/signac/blob/main/STYLE_GUIDE.md) and the coding conventions described below. Generally, a commit serves a single purpose and differences should be easy to understand. Do not mix formatting fixes or code moves with actual code changes.
    2. Commit your changes. Write a simple, straightforward commit message. To learn more, see [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).
    3. Push your changes to your remote fork.
    4. Create a PR on the Signac repository.
    5. Identify the type of PR by adding labels to it. For example, if you're still working on the changes, add the **work-in-progress** label. If you are proposing an enhancement, add the **enhancement** label.
    6. Wait for your changes to be reviewed. If you are a maintainer, you can assign your PR to one or more reviewers. If you aren't a maintainer, one of the maintainers will assign a reviewer.
    7. After you receive feedback from a reviewer, make the requested changes, commit them to your branch, and push them to your remote fork again.

After your PR is approved and validated, and no conflicts exist, it will be merged by a maintainer.
