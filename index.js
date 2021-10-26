// config inicial
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// forma de ler JSON / middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial / endpoint
app.get("/", function(req, res){
    res.json({msg: "Rota teste"});
});


const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// entregar um porta
mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@apicluster.u1o4j.mongodb.net/bancoapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectamos ao MongoDB")
        app.listen(3000, function(){
            console.log("Rodando na porta 3000")
        })
    })
    .catch((error) => console.log(error));