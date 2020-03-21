var express = require("express");
const app = express();

// Criando uma rota principal
app.get("/", (req, res)=>{
    res.send("<h1>Seja bem-vindo ao meu app!</h1>");
});

// Criando outra rota - Sobre
app.get("/sobre", (req, res)=>{
    res.send("<h1>Minha pagina sobre!</h1><p>foda-se</p>")
});

// Criando outra rota - Blog
app.get("/blog", (req, res)=>{
    res.send("<h1>Minha pagina blog!</h1>");
})




// (essa função tem que ser sempre a última)iniciando um servidor http 
    //Função de callBack - função que é sempre executada quando um evento acontece
app.listen(8081, ()=>{
    console.log("O servidor está rodando na url http://localhost:8081/");
});


