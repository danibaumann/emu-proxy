FROM node:14-alpine

LABEL maintainer="Dani Baumann <d.baumann@basol.ch>"

EXPOSE 3000

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

RUN mkdir /app && \
  chown -R node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install && npm cache clean --force && npm audit fix

COPY --chown=node:node . .

HEALTHCHECK --interval=10s --timeout=10s --start-period=10s --retries=2 \  
  CMD node ./healthcheck.js

CMD [ "node", "src" ]