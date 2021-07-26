 //require est la commande pour importer des requetes HTTP
const http = require("http");

//variale pour permettre de recevoir un port valide qu'il soit numérique ou texte
const normalizePort = val => {
    const port= parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false
}

//variable avec le port
//par defaut le port 3000 est appellé
//on appelle la fonction normalizePort
//grace à process.env.PORT, si on a un autre port par defaut celui-ci sera appellé
const port = normalizePort(process.env.PORT || "3000");

const app = require("./app"); //on va importer l'application EXPRESS que nous avons exporté dans app.js

//comme pour le serveur il faut indiquer à EXPRESS le port à utiliser grace a la variable
app.set("port", port)

//variable avec fonction qui va rechercher les erreurs éventuelles
//et va les afficher avec des motifs personnalisés
const errorHandler = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : "port : " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "Requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE" :
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const server = http.createServer(app) //permet de récupérer automatiquement les commandes de APP.JS

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : "port : " + port;
    console.log("Listening on " + bind);
});

//configuration pour faire écouter le serveur
server.listen(port);
