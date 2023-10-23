from node:16
WORKDIR /app
RUN npm install
COPY . .
ENTRYPOINT npm run dev