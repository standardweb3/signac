#!/bin/bash
packages=("core" "config" "error" "events" "init" "nxink")

for i in "${packages[@]}"
do
	cd "../packages/$i"
    yarn
    cd ../../scripts
done