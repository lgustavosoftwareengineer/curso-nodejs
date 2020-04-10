/*Importando modulos*/
    const mongoose = require("mongoose"); // Importando o mongoose-conector ao banco de dados MongoDB
    const Schema =  mongoose.Schema; // modulo que utilizado para criar o model Categoria

/*Estrurando o model */
    const Categoria = new Schema({
        
        // campo nome do db
        nome:{
            type: String,
            required: true
        },
        // campo slug do db - que é uma espécie de link para a categoria que eu
        // -> quero ir
        slug:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now()
        }
    })
/*Criando uma collection(categorias) no mongodb com o nome do model(Categoria)*/
    mongoose.model("categorias", Categoria)

/* Exportando o model */
    module.exports = Categoria;