import express from "express";
import mongoose from "mongoose";
import cors from "cors";



import router from "./routes/index.js";

const app = express();
const PORT = 3000;
const URI =
  "mongodb+srv://abhishek:abhishek@todo.77xy7dp.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("how are you");
});

app.use("/api/v1", router);

app.listen(PORT, async () => {
  try {
    await mongoose
      .connect(URI, {
        dbName: "Paytm",
      })
      .then(console.log(" MONGODB Database connected"));

    console.log(`Connected to http://localhost:${PORT}`);
  } catch (error) {
    console.log("error", error);
  }
});
