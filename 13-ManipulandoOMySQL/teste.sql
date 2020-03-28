/*Inserindo valores na minha tabela*/
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Luiz Gustavo", 
    "email@teste.com",
    18
);
/*Inserindo outros usuários*/
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Gabriel Gomes", 
    "email@teste2.com",
    19
);
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Luiz Tadeu", 
    "email@teste3.com",
    20
);
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Maria Clara",
    "marias@teste.com",
    8
);
INSERT INTO usuarios(nome, email, idade) VALUES(
    "Jão Batista",
    "jão@teste.com",
    8
);

/*Buscando com condições*/
SELECT * FROM usuarios WHERE idade = 8;
SELECT * FROM usuarios WHERE nome = "Lucas";
SELECT * FROM usuarios WHERE idade >= 18;

/*Deletando valores no SQL*/
DELETE FROM usuarios; /*Deleta todos os registros da tabela*/
DELETE FROM usuarios WHERE nome="Luiz Tadeu";