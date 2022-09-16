#  Install Cargo contract
echo "Detected System: $OSTYPE"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Arch Linux
    if [ -f "/etc/arch-release" ]; then
        pacman -S binaryen
        cargo install cargo-dylint dylint-link
        cargo install --force --locked cargo-contract
    # Debian/Ubuntu
    elif [ -f "/etc/debian_version" ]; then
        apt-get install -y binaryen
        cargo install cargo-dylint dylint-link
        cargo install --force --locked cargo-contract
    else
        echo "Unsupported Linux distribution"
        exit 1
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
        brew install binaryen
        brew install openssl
        cargo install cargo-dylint dylint-link
        cargo install --force --locked cargo-contract
elif [[ "$OSTYPE" == "msys" ]]; then
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
        echo "Windows is not supported yet, please install cargo-contract manually in the meantime at https://github.com/paritytech/cargo-contract"
elif [[ "$OSTYPE" == "win32" ]]; then
        echo "Windows is not supported yet, please install cargo-contract manually in the meantime at https://github.com/paritytech/cargo-contract"
else
        # Unknown.
        echo "Installer cannot detect your OS, please install cargo-contract manually in the meantime at https://github.com/paritytech/cargo-contract"
fi
