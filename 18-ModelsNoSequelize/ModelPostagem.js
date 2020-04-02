const Sequelize = require("sequelize");

// o nome do banco de dados, seguido do user geral e a senha, seguido de um
// objeto-literal com duas propriedades: host que é onde está o bando de dados,
// que é o meu computador - logo localhost - e dialect que é a propriedade
// que diz o tipo da linguagem de banco de dados/ e banco de dados trabalhada(o)
const sequelize = new Sequelize("test", "root", "imNayeon343",{
    host:'localhost',
    dialect:'mysql'
});

// definindo a tabela com o seu tipo-postagem- e os seus campos titulo e conteúdo
const Postagem = sequelize.define(
    'postagem',
     {
        // campo titulo da tabela Postagem
        titulo:{
            // definindo o tipo do campo titulo
            type:Sequelize.STRING //O tipo se é STRING porque o numero de caracteres é determinado ou é pouco
        },
        
        // campo conteudo da tabela Postagem
        conteudo: {
            // definindo o tipo do compo conteúdo
            type:Sequelize.TEXT // O tipo se é TEXT porque o numero de caracteres não é delimitado
        }
    })
    
// Criando a tabela postagem no bando de dados teste e sincronizando os campos feitos
//Postagem.sync({force: true}) 

//Adicionando dados na tabela
Postagem.create({
    titulo: "Um título qualquer!",
    conteudo: "Oi eu sou o Goku!"
})


//autenticação caso se conectou com sucesso no bando de dados ou não e qual o erro
sequelize.authenticate().then(function(){console.log("Conectado com sucesso!")}).catch(function(erro){console.log("Falha ao se conectar, erro: "+erro)})


