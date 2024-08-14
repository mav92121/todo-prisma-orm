import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/", todoRoutes);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
