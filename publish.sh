#!/bin/sh

./generate.py -c demo.json build
./generate.py -c auction.json build
./generate.py -c counter.json build

appcfg.py --no_cookies --email=fabian.jakobs@googlemail.com --passin update ..