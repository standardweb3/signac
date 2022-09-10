# nxink

Nxink is a plugin for Nx to operate ink! smart contracts

## Prerequisite

install [cargo-contract](https://github.com/paritytech/cargo-contract#installation)

## Generators

```sh
> nx generate nxink:ink my-ink-contract
```

## Executors

```sh
# Build a contract
> nx build my-ink-contract

# Run unit tests in a library
> nx test my-ink-contract

# Check a Rust project with `clippy`
> nx lint my-ink-contract
# Don't fail on warnings:
> nx lint my-ink-contract --fail-on-warnings false
```

### Options

The executors accept most of the same CLI args as the corresponding `cargo contract` commands. When in doubt, run with the `--help` flag to see all options with descriptions:

```sh
> nx build my-ink-contract --help
```
