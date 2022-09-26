const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { networkInterfaces } = require("os");


app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://test:test@cluster0.npe8jxd.mongodb.net/notesDB", { useNewUrlParser: true }, { useUnifiedTopology: true })

// crwate a data schema
const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", notesSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    let newNode = new Note({
        title: req.body.title,
        content: req.body.content
    });
    newNode.save();
    res.redirect('/index.html');
})


app.listen(3000, function() {
    console.log("server is running on 3000");
})
