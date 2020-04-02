const Sequelize = require("sequelize");

// o nome do banco de dados, seguido do user geral e a senha, seguido de um
// objeto-literal com duas propriedades: host que é onde está o bando de dados,
// que é o meu computador - logo localhost - e dialect que é a propriedade
// que diz o tipo da linguagem de banco de dados/ e banco de dados trabalhada(o)
const sequelize = new Sequelize("test", 'root', 'imNayeon343', {
    host:"localhost",
    dialect:"mysql"
});

//Definindo o model com qual o tipo do model e logo depois as colunas da tabela que será criada
const Usuario = sequelize.define( 
    "usuarios", 
    {
        nome: {
            type:Sequelize.STRING
        },
        sobrenome: {
            type:Sequelize.STRING
        },
        idade: {
            type:Sequelize.INTEGER
        },
        email:{
            type:Sequelize.STRING
        },
    }
)
// Criando a tabela usuarios e sincronizando
//Usuario.sync({force: true});

//Adicionando dados na tabela usuarios;
Usuario.create({
    nome: "Luiz",
    sobrenome: "Matias",
    idade: "18",
    email:"luiz@teste.com"
})




