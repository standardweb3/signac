#!/bin/bash
packages=("core" "config" "error" "events" "init" "nxink")

for i in "${packages[@]}"
do
	cd "../dist/packages/$i"
    yarn publish
    cd ../../../scripts
done