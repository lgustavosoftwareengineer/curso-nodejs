/* Importando os módulos */
    const express = require("express");
    const router = express.Router()
    const mongoose = require("mongoose");
    const flash = require("connect-flash")
    require("../models/Categoria");
    require("../models/Postagem");
    /* Utilizando o meu model dentro de uma rota */
        const Categoria = mongoose.model("categorias"); 
        const Postagem = mongoose.model("postagens");


// Main page admin
    router.get("/", (req, res) => {
        res.render("./admin/index") // Renderizando a página: admin/index
    })

// Página dos posts
    router.get("/posts", (req, res) => {
        res.send("<h1>Posts page</h1>") // Enviando para a pagina uma mensagem em forma de h1
    })

/* ======================================================================================================= */
/* CATEGORIAS */
/* ======================================================================================================= */

// Página onde ficarão listadas as categorias
    router.get("/categorias", (req, res) => {
        
        Categoria.find().sort({date: "desc"}).then((categorias)=>{
            //console.log(categorias)
            res.render("./admin/categorias",
            // Eu tenho que converter as categorias para JSON para assim conseguir renderizar na tela
             {categorias: categorias.map(categoria => categoria.toJSON())}) // Renderizando a página: admin/categorias
            
        }).catch((err)=>{
            
                req.flash("error_msg", "Houve um erro ao listar as categorias")
                res.redirect("/admin")
            }
        );
    
    })

// Página de adicionar categorias
    router.get("/categorias/add", (req, res) => {
        res.render("./admin/addcategorias") // renderizando a página: admin/addcategorias
    })
// Onde será feita a validação dos dados que eu recebo do formulário da view addcategorias através da sua action
    router.post("/categorias/nova", (req, res) => {

    // Array de erros onde ficarao os erros
        var erros = [];

    // Verificando se o nome é válido
        if ( !req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push( {texto: "Nome inválido"} ) 
        } 

        // Verificando se o nome é muito curto
        if (req.body.nome.lenght < 2){
            erros.push( {texto: "Nome muito curto"} )
        }

    // Verificando se o slug é válido
        if ( !req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ){
            erros.push( {texto: "Slug inválido"} )
        } 

    // Verificando o tamanho do array de erros para ver se existe algum erro para ai exibilo na tela na pagina admin/categorias/nova
        if (erros.lenght > 0){
            
            // Abrindo a página  
            res.render( "admin/addcategorias", {erros: erros} )
        }
    // Caso não exista nenhum erro eu irei criar uma nova
    // categoria e logo depois salvá-la no banco de dados
        else {

            // Criando nova categoria
                const novaCategoria = {
                    nome: req.body.nome,
                    slug: req.body.slug,
                }

            // Salvando ela no banco de dados, ao mesmo tempo
            // que confirmo se tudo correu certo(then()) ou existe algum
            // erro(catch())
                new Categoria(novaCategoria).save(
            
            ).then( ()=> {
                    // Mensagem para quando a categoria for criada com sucesso aparecer usando o
                    // modulo flash
                        req.flash("success_msg", "Categoria criada com sucesso!")
                        res.redirect("/admin/categorias") // Redirecionando para a página admin/categorias quando a categoria for criada
                        console.log("Nova categoria criada com sucesso") // Confirmando que a categoria foi criada com sucesso com um console.log
            }

            ).catch((err)=> {
                    // Mensagem para quando a categoria nao conseguir ser criada com sucesso  
                        req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
                        res.redirect("/admin") // Redirecionando para a página admin/ caso eu nao consiga criar uma nova categoria
                        console.log("Erro:" + err) // exibindo a mensagem de erro no console.log()
            })
        }
    
})
// Rota onde ocorre a edição da categoria
    router.get("/categorias/edit/:id", (req, res) => {
        Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
            res.render('admin/editcategorias', {categoria:categoria})
        }).catch(
            (err) => {
                req.flash("error_msg", "Essa categoria não existe")
                res.redirect("/admin/categorias")
            }
        )
        
    })

// Rota onde os dados do formulário da view editcategorias através da action serão enviados para assim serem tratados e confirmados
    router.post("/categorias/edit", (req, res) => {
        Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug // Campo slug vai receber o valor que eu estou passando no formulário
            categoria.save().then( ()=> {
                req.flash("success_msg", "Categoria editada com sucesso!")
                res.redirect("/admin/categorias")
            }).catch( (err)=> {
                    req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
                    res.redirect("/admin/categorias")
                }
            )
        }).catch( (err)=> {
            req.flash("error_msg", "Houve um erro ao editar a categoria")
            res.redirect("/admin/categorias")
        })
    })
// Rota para deletar categorias
    router.post("/categorias/deletar", (req, res) => {
        Categoria.remove({_id: req.body.id}).then(()=>{
            req.flash("success_msg", "Categoria deletada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch( (err)=> {
            req.flash("error_msg", "Houve um erro em deletar a categoria")
            res.redirect("/admin/categorias")
        }
        );
    })

/* ======================================================================================================= */
/* POSTAGENS */
/* ======================================================================================================= */

// Rota de postagens
    router.get("/postagens", (req, res) => {
        Postagem.find().populate("categoria").sort({date:"desc"}).then( (postagens)=>{
            res.render("admin/postagens", {postagens: postagens.map(postagem => postagem.toJSON())} )
        }).catch( (err) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens")
            res.redirect("/admin")
        })
    })

// Rota de adicionar postagens - renderizando a página para adicionar postagens
    router.get("/postagens/add", (req, res)=>{

        // Encontrando o Schema para assim poder populá-lo com dados
        Categoria.find().then((categorias)=>{
            // Renderizando a view addpostagem que possui um formulário para adicionar postagens e também renderizando a conexão para adicionar elementos no Schema do banco de dados
                // !!IMPORTANTE!! Antes de renderizar a conexão eu devo converte-lá para JSON 
                // que é o modo que o navegador consegue receber para assim renderizar as informações
            res.render("admin/addpostagem", {categorias: categorias.map(categoria => categoria.toJSON())})

        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao carregar o formulário")
            res.redirect("/admin")
        })
    })

// Rota para a action do formulário da view addpostagem. Serve para confirmar a mudança e enviar para o banco de dados
    router.post("/postagens/nova", (req, res)=>{

        // Validando os dados postos antes de envia-los para o banco de dados
            var erros = [];
            if(req.body.categoria == "0") { erros.push({texto: "Categoria inválida, registre uma categoria"})};
            if(erros.length > 0) { res.render("admin/addpostagem", {erros: erros.map(erro => erro.toJSON())})}
            
            // Se ele passar por todas as validações: 
                else {
                    // Obtendo os dados do html para assim o por no Schema para envia-lo ao db
                        const novaPostagem = {
                            titulo: req.body.titulo,
                            descricao: req.body.descricao,
                            conteudo: req.body.conteudo,
                            categoria: req.body.categoria,
                            slug: req.body.slug
                        }   

                    // Adicionando o Schema no db
                        new Postagem(novaPostagem).save().then( ()=>{
                            req.flash("success_msg", "Postagem criada com sucesso!")
                            res.redirect("/admin/postagens")
                        }).catch( (err)=>{
                            req.flash("error_msg", "Houve um erro durante o salvamento da postagem");
                            res.redirect("/admin/postagens")
                        })
                }
    })

// Editando postagem através do ID
    router.get("/postagem/edit/:id", (req, res) => {
        //!!!! IMPORTANTE LEMBRAR DE POR O "lean()" ANTES DO "then" PARA PODER ASSIM RENDERIZAR O VALOR NA VIEW
        Postagem.findOne({_id: req.params.id}).lean().then( (postagem) => {
            //Achando a Categoria para depois renderiza-la na tela
            Categoria.find().then( (categorias) => {
                // aqui estou renderizando para a minha view editpostagens as categorias e postagens do banco de dados
                // que estão assimiladas ao id proposto
                res.render("admin/editpostagens", {categorias: categorias.map(categoria => categoria.toJSON()), postagem: postagem})
            })
        })
    })

    // Finalizando a edição das postagens recebe os dados do formulário editpostagens através do action. Enviando elas para o db
    router.post("/postagem/edit", (req, res) => {
        Postagem.findOne({_id: req.body.id}).then((postagem) => {

            postagem.titulo = req.body.titulo
            postagem.slug = req.body.slug
            postagem.descricao = req.body.descricao
            postagem.conteudo = req.body.conteudo
            postagem.categoria = req.body.categoria

            postagem.save().then( ()=> {
                req.flash("success_msg", "Postagem editada com sucesso")
                res.redirect("/admin/postagens")
            }).catch( (err)=> {
                req.flash("error_msg", "Erro ao editar ao editar a postagem: "+ err)
                res.redirect("/admin/postagens")
            })
        }).catch( (err) => {
            req.flash("error_msg", "Houve um erro ao salvar a edição")
            res.redirect("/admin/postagens")

        })
    })




module.exports = router; // Exportando o modulo router