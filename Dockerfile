FROM oven/bun AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

COPY ./src ./src
COPY ./migrations ./migrations
COPY ./tsconfig.json ./tsconfig.json

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile api \
    ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/api api

ENV NODE_ENV=production

CMD ["./api"]

EXPOSE 3000
