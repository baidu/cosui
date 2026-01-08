#!/usr/bin/env bash

set -e

echo "node $(node -v)"
echo "pnpm $(pnpm -v)"

NODE_ENV=development pnpm install

echo "start build..."
rm -rf lib output
pnpm run build

cd ../../
mkdir output
cp -R packages/marklang/lib/ output/

echo "build success"
