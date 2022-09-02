#!/bin/bash
# install dependancies, this is executed in root project directory
packages=("core" "config" "error" "events" "init" "nxink")

for i in "${packages[@]}"
do
	cd "./packages/$i"
    yarn
    cd ../..
done

cd ../

for i in "${packages[@]}"
do
    nx build "$i"
done