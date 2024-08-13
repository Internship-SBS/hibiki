#!/bin/bash

corepack enable
corepack prepare pnpm@latest --activate
pnpm i
cd services/api/