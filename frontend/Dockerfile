FROM node:22.20.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.20.0-slim
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]