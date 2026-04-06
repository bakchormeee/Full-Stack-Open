require("dotenv").config();
const startServer = require("./server");
const connectToDatabase = require("./db");

const main = async () => {
  startServer(process.env.PORT);
  await connectToDatabase(process.env.MONGODB_URI);
};

main();
