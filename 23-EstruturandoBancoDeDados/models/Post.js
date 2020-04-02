const db = require("./db");

// Criando uma tabela com o nome postagens no db postApp
const Post = db.sequelize.define(
    "postagens", 
    {
        titulo : {
            type: db.Sequelize.STRING
        },
        conteudo : {
            type: db.Sequelize.TEXT
        }
    }
);

//Post.sync({force: true});
module.exports = Post;