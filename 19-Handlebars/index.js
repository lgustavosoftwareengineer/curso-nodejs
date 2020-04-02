const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");


// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    // Conection with my database mysql
        // o nome do banco de dados, seguido do user geral e a senha, seguido de um
        // objeto-literal com duas propriedades: host que é onde está o bando de dados,
        // que é o meu computador - logo localhost - e dialect que é a propriedade
        // que diz o tipo da linguagem de banco de dados/ e banco de dados trabalhada(o)
    const sequelize = new Sequelize("test", "root", "imNayeon343",{
        host:'localhost',
        dialect:'mysql'
    });


// Rota home
app.get("/", function(req, res){res.send("Hello")});

// Rota que leva para uma página formulário que esta dentro da pasta views
app.get("/cad", function(req, res){
    res.render('formulario')
})
// Rota que a action do formulário direciona depois do botão submit ser acionado
app.post("/add", function(req,res){
    res.send("Texto: "+req.body.titulo+" Conteudo: "+req.body.conteudo)
})




// Rodando o servidor na porta localhost:8081
app.listen(8081, function(){
    console.log('O servidor está rodando!');
});