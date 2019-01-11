var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

// Função simples do gerenciamento a rotas.
var rotear = function(pathname) {
    if(pathname && pathname !== "/") {
        var arquivo = path.join(__dirname, pathname + ".html");
        var existe = fs.existsSync(arquivo);
        if (existe)
            return arquivo;
        return path.join(__dirname, "erro.html");
    }
    return path.join(__dirname, "artigos.html");
};

// Iniciando Servidor do desafio
var server = http.createServer(function(request, response) {
    // Obtendo o pathname digitando no browser 
    var pathname = url.parse(request.url, true).pathname;
    // Processando roteamento do pathname
    var pagina = rotear(pathname);
    // Renderizando a pagina html
    fs.readFile(pagina, function(erro, html) {
        response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        response.write(html);
        response.end();
    });
});

server.listen(3000, function() {
    console.log("Executando Desafio.");
});