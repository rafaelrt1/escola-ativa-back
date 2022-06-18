const express = require("express");
const router = express.Router();
const connection = require('../config/connectDb');

router.get("/disciplinas", async (req, res, next) => {
    try {
        connection.query("Select nomeDisc from disciplina;", function(err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/disciplina", async (req, res, next) => {
    try {
        let disciplina = req.body.disciplina.toString();
        connection.query("insert into disciplina(nomeDisc) values (?)", disciplina, function(err, result){
            if(err) throw err;
            res.json(disciplina)
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.put("/disciplina", async (req, res, next) => {
    try {
        let disciplina = parseInt(req.body.disciplina);
        let novoNome = req.body.nome.toString();
        let values = [novoNome, disciplina]
        connection.query("update disciplina set nomeDisc = ? where idDisc = ?", values, function(err, result){
            if(err) throw err;
            res.json(values);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/disciplina", async (req, res, next) => {
    try {
        let disciplina = parseInt(req.body.disciplina);
        connection.query("delete from disciplina where idDisc = ?", disciplina, function(err, result){
            if(err) throw err;
            res.json(disciplina);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/turmas", async (req, res, next) => {
    try {
        connection.query("Select nomeTur from turma;", function(err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/turma", async (req, res, next) => {
    try {
        let turma = req.body.turma.toString();
        connection.query("insert into turma(nomeTur) values (?);", turma, function(err, result) {
            if(err) throw err;
            res.json(turma);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/alunos", async (req, res, next) => {
    // let idTur = req.body.turma;
    try {
        connection.query(`Select al.nomeAlu from aluno al join turma t on al.idTur = t.idTur;`, function(err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/disciplina", async (req, res, next) => {
    try {
        let disciplina = req.body.disciplina;
        connection.query("insert into disciplina(nomeDisc) values (?)", disciplina.toString(), function(err, result){
            if(err) throw err;
            res.json(disciplina)
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/aluno", async (req, res, next) => {
    try {
        let aluno = req.body.aluno.toString();
        let turma = parseInt(req.body.turma);
        let values = [aluno, turma];
        connection.query("insert into aluno(nomeAlu, idTur) values (?, ?)", values, function(err, result){
            if(err) throw err;
            res.json(values);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/aluno", async (req, res, next) => {
    try {
        let aluno = parseInt(req.body.aluno);
        connection.query("delete from aluno where idAlu = ?", aluno, function(err, result){
            if(err) throw err;
            res.json(aluno);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;