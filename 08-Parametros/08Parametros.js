var express = require("express");
const app = express();

// Criando a rota principal
app.get("/", (req, res)=>{
    res.send("<h1>Rota principal</h1>");
});
// Criando a rota Ola com parêmetros nome e cargo
app.get("/ola/:nome/:cargo", (req, res)=>{
    res.send("<h1>Olá " +req.params.nome + "</h1>" + "<h2> Seu cargo é: "+req.params.cargo + "</h2>"); // Eu só posso chamar uma função send
});




// !!!!Tem que ficar no final!!!!! - Iniciando o servidor
app.listen(8081, ()=>{
        console.log("O servidor da aula 08 - Parâmetros, está rodando...");
    
});
