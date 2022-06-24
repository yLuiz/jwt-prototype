FROM node:latest as node
WORKDIR  /usr/app
# RUN npm install -g @angular/cli \
#     # && npm install --save-dev \
#     # && npm install @angular-devkit/build-angular \
#     && npm install && ng update && npm update
# COPY --chown=node:node . .
USER node
EXPOSE 4200
CMD [ "npm","start" ]