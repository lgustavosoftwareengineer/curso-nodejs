// Importações
const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const Post = require("./models/Post");


// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    
//Rotas
    // Rota home
    app.get("/", function(req, res){
        //Recendo os dados da tabela postagens e renderizo
        //Aqui eu recebo um array de posts/ determinando a ordem que irá aparecer os posts - DESC:
        // para do mais novo para o velho e ASC do mais velho para o mais novo;
        Post.findAll({order: [['id', 'DESC']]}
        // Recebendo os posts
        ).then(function(posts){
            // Renderizando os posts e a view home
            res.render(
                'home',
                {posts: posts})
            })
        });

    // Rota do formulário
    app.get("/cad", function(req, res){
        // Renderizando o formulário na rota
        res.render('formulario')
    })

    // Rota onde será realizado o post.
    // Para onde a rota /cad irá depois que enviar os resultados
    app.post("/add", function(req, res){
        // Enviando dados do formulário para a tabela postagens
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
            //Redirecionando para a página "/" logo depois de enviar os dados
        }).then(function(){
            res.redirect('/')
            //Caso aconteça um erro: 
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    // Rota que irá para deletar posts 
    app.get("/deletar/:id", (req,res)=>{
        // Fazendo um where pelo id
        Post.destroy({where: {'id':req.params.id}}
        // Caso sucesso em se deletar o post:
        ).then(
            ()=>{res.send("Postagem deletada com sucesso!")}
        // Caso erro em se deletar o post:
        ).catch(
            (erro)=>{res.send("Essa postagem não existe! /n O erro é: "+erro)}
        );
    })


// Rodando o servidor na porta localhost:8081
app.listen(8081, function(){
    console.log('O servidor está rodando!');
});