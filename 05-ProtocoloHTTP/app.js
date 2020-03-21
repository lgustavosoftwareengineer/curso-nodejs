var http = require('http');

// Abre um servidor http
// O listen diz em qual porta que o meu servidor será criado
http.createServer(
    // Temos aqui dentro uma função de callback que é uma função de resposta
    function(req, res){
        // O res - serve para enviar alguma resposta para o usuário
        res.end("<h1>Hello World! Welcome to my website</h1>");
    }).listen(8081);

console.log("O servidor está rodando!")