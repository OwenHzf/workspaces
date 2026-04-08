import express from "express";
import db from "./database/database.js";
import router from "./routes/router.js"
const app= express();
app.listen(3000,()=>{
    console.log("listening on 3000");
})
app.use(express.static("public"))
app.use(express.json());

app.use("/api/v1", router);