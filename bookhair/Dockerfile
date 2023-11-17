from node:16
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://postgres:Azerty-02@db:5432/mydb" NEXTAUTH_SECRET="v&SqGk.$X5W-X+(5%4iqW@YZ*YR6'0"
ENTRYPOINT ["./start.sh"]
EXPOSE 3000 5555