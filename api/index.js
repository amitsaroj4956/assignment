import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import users from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.static("images"));
app.use("/images", express.static(__dirname + "/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use(cors());

app.use("/api/users", users);

const DB_CONNECTION = process.env.DATABASE_URL;
const PORT = process.env.PORT || 6000;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_CONNECTION)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running at: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
