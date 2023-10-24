from node:16
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
ENV DATABASE_URL="postgresql://postgres:Azerty-02@127.0.0.1:5432/mydb?schema=sample" NODE_ENV="devlopment"
ENTRYPOINT npm run dev
EXPOSE 3000
