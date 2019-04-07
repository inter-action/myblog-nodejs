PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
SRC_ROOT := server

.PHONY: 

dev:
	nodemon --config nodemon.json

compile:
	tsc

compile.watch:
	tsc -w

debug.tsc.chrome:
	node --inspect-brk build/index.js

test:
	mocha --require ts-node/register test/**/*.ts server/**/*.test.ts

docker.build:
	docker build -t g2zero/myblog-nodejs .

docker.container.create:
	# or replace -it with -d, start with a demon mode
	docker run -v $(shell pwd)/mdroot:/home/node/app/mdroot --name myblog -p 5000:5000 -it g2zero/myblog-nodejs 

docker.container.start:
	docker start myblog

docker.container.stop:
	docker stop myblog

run.ansible:
	cd ansible && ansible-playbook deploy-playbook.yaml

deploy: run.ansible
