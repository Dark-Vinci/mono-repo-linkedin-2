#!/bin/bash

protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./auth/*.proto
protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./account/*.proto
protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./models/*.proto
