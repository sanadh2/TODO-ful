const express = require("express");
const app = express();
const { connected } = require("./db");
require("dotenv").config();
const { notFound } = require("./Middleware/NotFound");
const { taskRouter } = require("./Routes/routes");
const errorHandlerMiddleWare = require("./Middleware/errorHandler");
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:1111",
  })
);

app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandlerMiddleWare);

const startDB = async () => {
  try {
    await connected(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server and db started at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
startDB();
