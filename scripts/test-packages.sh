#!/bin/bash
# install dependancies, this is executed in root project directory
packages=("core" "config" "error" "events" "init" "nxink" "build" "test" "add-contract" "common")

for i in "${packages[@]}"
do
	cd "./packages/$i"
    yarn
    cd ../..
done


for i in "${packages[@]}"
do
    nx test "$i"
done
