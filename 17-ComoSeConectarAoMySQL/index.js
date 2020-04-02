var express = require("express");
const app = express();

app.get("/", (req, res)=>{res.send("Seja bem-vindo!")});
app.get("/pagina1", (req, res)=>{res.sendFile("");});
app.get("/pagina2", (req, res)=>{res.sendFile("");});

app.listen(8081, ()=>{
    console.log("Servidor rodando...");
}); 