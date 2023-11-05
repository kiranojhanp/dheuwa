###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development
RUN npm install -g pnpm@8.10.0

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch
COPY --chown=node:node . .
RUN pnpm install

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
RUN npm install -g pnpm@8.10.0

ARG build='local'
ARG version='0.1'
ENV API_BUILD $build
ENV API_VERSION $version
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm build
RUN pnpm install --prod
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
