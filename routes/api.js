const express = require("express");
const router = express.Router();
const connection = require('../config/connectDb');

router.get("/disciplinas", async (req, res, next) => {
    try {
        connection.query("Select idDisc as id, nomeDisc as nome from disciplina;", function(err, rows, fields) {
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
        let disciplina = parseInt(req.body.id);
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
        connection.query("Select idTur as id, nomeTur as nome from turma;", function(err, rows, fields) {
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

router.put("/turma", async (req, res, next) => {
    try {
        let novoNomeTurma = req.body.novoNomeTurma.toString();
        let turma = parseInt(req.body.turma);
        let values = [novoNomeTurma, turma];
        connection.query("update turma set nomeTur = ? where idTur = ?;", values, function(err, result) {
            if(err) throw err;
            res.json(turma);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/turma", async (req, res, next) => {
    try {
        let turma = parseInt(req.body.turma);
        connection.query("delete from turma where idTur = ?;", turma, function(err, result) {
            if(err) throw err;
            res.json(turma);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/alunos", async (req, res, next) => {
    try {
        connection.query(`Select idAlu as idAluno, nomeAlu as nome, t.nomeTur as turma, al.idTur as idTurma from aluno al join turma t on al.idTur = t.idTur;`, function(err, rows, fields) {
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

router.post("/turma-disciplina", async (req, res, next) => {
    try {
        let disciplina = parseInt(req.body.disciplina);
        let turma = parseInt(req.body.turma);
        let values = [turma , disciplina];
        connection.query(`select * from turma_disciplina where idTur = ${turma} and idDisc = ${disciplina};`, '', function(err, result){
            if(err) throw err;
            if (!result.length) {
                connection.query("insert into turma_disciplina(idTur, idDisc) values (?, ?);", values, function(err, result){
                    if(err) throw err;
                    res.json(values);
                }).end;
            }
            else 
                res.json({result, status:"Turma e disciplina já vinculadas"});
        }).end;
        // connection.query("insert into turma_disciplina(idTur, idDisc) values (?, ?);", values, function(err, result){
        //     if(err) throw err;
        //     res.json(values);
        // }).end;
    } catch (e) {
        console.error(e);
    }
});

router.put("/turma-aluno", async (req, res, next) => {
    try {
        let aluno = parseInt(req.body.aluno);
        let turma = parseInt(req.body.turma);
        connection.query(`update aluno set idTur = ${turma} where idAlu = ${aluno};`, '', function(err, result){
            if(err) throw err;
            res.json(values);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;