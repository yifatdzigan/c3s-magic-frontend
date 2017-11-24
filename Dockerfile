FROM node:6.11.4
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /frontend/c3s-magic-frontend/
COPY . /frontend/c3s-magic-frontend/

RUN npm install --silent
RUN npm run clean
RUN npm run deploy:prod
# Install `serve` to run the application.
RUN npm install -g serve
# Set the command to start the node server.
CMD echo "const config = { 'backendHost': '${CONTROLLER}', 'adagucServicesHost': '${COMPUTE}' };" > /frontend/c3s-magic-frontend/dist/config.js && serve -s dist

EXPOSE 5000

#docker build -t c3s-magic-frontend .
#docker run -e COMPUTE="https://compute-test.c3s-magic.eu:8888" -e CONTROLLER="https://compute-test.c3s-magic.eu:7777" -p 8081:5000 -it c3s-magic-frontend

