PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
SRC_ROOT := server

.PHONY: 

dev:
	nodemon --config nodemon.json

compile:
	tsc

debug.tsc.chrome:
	node --inspect-brk build/index.js

test:
	mocha --require ts-node/register test/**/*.ts server/**/*.test.ts
