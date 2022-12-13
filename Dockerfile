FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . ./
RUN npm run build
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "start"]