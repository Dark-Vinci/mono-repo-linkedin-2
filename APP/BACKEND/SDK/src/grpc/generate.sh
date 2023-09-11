#!/bin/bash

# npm proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=generated/ **/*.proto
# protoc --go_out=plugins=grpc:. --ts_opt=paths=source_relative ./banking/*.proto


# protoc -I=sourcedir --ts_out=dist myproto.proto

# protoc -I=. --ts_out=generated ./auth/*.proto
# protoc  --ts_opt=target=node -I=. --ts_out=generated ./auth/*.proto

protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./auth/*.proto
protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./account/*.proto
protoc --plugin=/Users/ademolaolutomiwaabraham/Desktop/allcodes/work-go/src/mono-repo-linkedin/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./models/*.proto
