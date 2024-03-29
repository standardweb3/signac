#!/bin/bash
# install dependancies, this is executed in root project directory
packages=("core" "config" "error" "events" "init" "nxink" "build" "test" "add-contract" "common")

rm -rf dist/packages

for i in "${packages[@]}"
do
	cd "./packages/$i"
    yarn
    cd ../..
done


for i in "${packages[@]}"
do
    nx build "$i"
done

for i in "${packages[@]}"
do
	cd "dist/packages/$i"
    yarn 
    cd ../../..
done