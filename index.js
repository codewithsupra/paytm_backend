const express = require("express");
const mainRouter=require("../backend/routes/index.js")
const cors=require("cors")

const port=3000;

app.use(cors());
app.use(express.json());
const app=express();
app.use("/api/v1",router)
app.listen(port,()=>{
    console.log("Listening on port 3000")
})


