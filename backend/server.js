import "dotenv/config";

import express from "express";
import cors from "cors";

import genRouter from "./routers/geminiRouter.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", genRouter);



app.get("/", (req, res) => {
    res.json({
        message: "AI Helper Bot Backend is running!"
    });
});




app.listen(process.env.PORT, () => {
    console.log("server is running on port 5005");
});