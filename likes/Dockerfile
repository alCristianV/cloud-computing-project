FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
RUN npm run build
ENV PORT 3002
EXPOSE $PORT
CMD ["npm", "start"]