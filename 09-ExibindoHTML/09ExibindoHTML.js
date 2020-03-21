var express = require("express");
var app = express();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/HTML/index.html");
});
app.get("/sobre", (req, res)=>{
    res.sendFile(__dirname + "/HTML/sobre.html");
})



app.listen(8081, ()=>{console.log("O servidor 09 Exibindo HTML esta rodando...")})