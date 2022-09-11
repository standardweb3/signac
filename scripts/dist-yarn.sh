#!/bin/bash
packages=("core" "config" "error" "events" "init" "nxink" "build" "test" "add-contract" "common")

for i in "${packages[@]}"
do
	cd "dist/packages/$i"
    yarn 
    cd ../../..
done