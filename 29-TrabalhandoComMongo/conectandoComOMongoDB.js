const mongoose = require("mongoose");
/** Configurando **/
    //Estabelecendo a conexão com o banco de dados
        mongoose.connect("mongodb://localhost/aula29").then(()=>console.log("Conexão realizada com sucesso...")).catch((err)=>console.log("Conexão não realizada. Erro: "+err))
    
    //Criando o meu model 
        const UsuarioSchema = mongoose.Schema({
            nome: {
                type: String
            },
            email: {
                type: String
            }, 
            senha: {
                type: String
            },
        })
    
    // Nome da Collections que vai armazenar os usuários    
        mongoose.model("usuarios", UsuarioSchema);

    //Criando um usuário
        const Luiz = mongoose.model("usuarios");
        new Luiz({
            nome: "Luiz",
            email: "luiz@email.com",
            senha: "testeTeste"
        }).save().then(()=>console.log("Novo usuário criado com sucesso!")).catch((err)=>console.log(`Falha em criar um novo usuário. /nErro: ${err}`));



