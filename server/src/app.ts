import express from "express";
import dotenv from "dotenv";
import WordRouter from "./routers/WordRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api/v1/word", WordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
