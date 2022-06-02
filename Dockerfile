FROM node:14-alpine3.15 As builder

### STAGE 1: Build ###
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build ns-saltire
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.15.8-alpine


COPY --from=builder /usr/src/app/dist/ns-ceiling-fan-frontend/ /usr/share/nginx/html
# COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
