/* Importando os módulos */
    const express = require("express");
    const router = express.Router()
    const mongoose = require("mongoose");
    const flash = require("connect-flash")
    require("../models/Categoria");
    /* Utilizando o meu model dentro de uma rota */
        const Categoria = mongoose.model("categorias"); 


// Main page admin
    router.get("/", (req, res) => {
        res.render("./admin/index") // Renderizando a página: admin/index
    })

// Página dos posts
    router.get("/posts", (req, res) => {
        res.send("<h1>Posts page</h1>") // Enviando para a pagina uma mensagem em forma de h1
    })

// Página das categorias
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

// Onde será feita a validação dos dados que eu recebo do formulário
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
// Rota de editar categoria
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

//
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
// 
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
module.exports = router; // Exportando o modulo router