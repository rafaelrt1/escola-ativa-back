const express = require("express");
const router = express.Router();
const connection = require('../config/connectDb');
const passport = require('passport');

router.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
);

router.get("/disciplinas", async (req, res, next) => {
    try {
        connection.query("Select nomeDisc as nome, idDisc as id from disciplina;", function (err, rows, fields) {
            if (err)
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/disciplina", async (req, res, next) => {
    try {
        let disciplina = req.body.disciplina.toString();
        connection.query("insert into disciplina(nomeDisc) values (?)", disciplina, function (err, result) {
            if (err) 
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json({success: rows});
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
        connection.query("update disciplina set nomeDisc = ? where idDisc = ?", values, function (err, result) {
            if (err) 
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json({success: "Sucesso"});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/disciplina", async (req, res, next) => {
    try {
        let disciplina = parseInt(req.body.disciplina);
        connection.query("delete from disciplina where idDisc = ?", disciplina, function (err, result) {
            if(err)
                res.json({error: "Ocorreu um erro ao realizar a operação"});
            else
                res.json({success: "Sucesso"});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/conteudos", async (req, res, next) => {
    try {
        connection.query("Select nomeCont as nome, idCont as id from conteudo;", function (err, rows, fields) {
            if (err) 
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/conteudo", async (req, res, next) => {
    try {
        let conteudo = req.body.conteudo.toString();
        connection.query("insert into conteudo(nomeCont) values (?)", conteudo, function (err, result) {
            if (err)
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json({success: "Sucesso"});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.put("/conteudo", async (req, res, next) => {
    try {
        let conteudo = parseInt(req.body.id);
        let novoNome = req.body.nome.toString();
        let values = [novoNome, conteudo]
        connection.query("update conteudo set nomeCont = ? where idCont = ?", values, function (err, result) {
            if (err)
                res.json({error: "Não foi possível realizar esta operação"});
            else
                res.json({success: "Sucesso"});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/conteudo", async (req, res, next) => {
    try {
        let conteudo = parseInt(req.body.conteudo);
        connection.query("delete from conteudo where idCont = ?", conteudo, function (err, result) {
            if(err)
                res.json({error: "Ocorreu um erro ao realizar a operação"});
            else
                res.json({success: "Sucesso"});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/turmas", async (req, res, next) => {
    try {
        connection.query("Select nomeTur as nome, idTur as id from turma;", function (err, rows, fields) {
            if(err)
                res.json({error: "Ocorreu um erro ao realizar a operação"});
            else
                res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/turmas/:disc", async (req, res, next) => {
    try {
        let disciplina = req.params.disc;
        connection.query("Select t.nomeTur as nome, t.idTur as id from turma t join turma_disciplina td using (idTur) join disciplina d using (idDisc) where d.idDisc = ? ;", disciplina, function (err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/pontuacao", async (req, res, next) => {
    try {
        let disciplina =  parseInt(req.query.disc);
        let turma =  parseInt(req.query.tur);
        // console.log(disciplina, turma);
        let values = [disciplina, turma]
        connection.query(`Select a.nomeAlu as nomeAluno,
         c.nomeCont as conteudo, p.fase as fase,
         p.nota as nota, 
         p.idPon
         from pontuacao p 
         join aluno a using (idAlu) 
         join turma_disciplina td using (idTD) 
         join turma t on t.idTur = td.idTur 
         join disciplina d using (idDisc) 
         join conteudo c using (idCont) 
         where d.idDisc = ? and t.idTur = ?`, values, function (err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/notafinal", async (req, res, next) => {
    try {
        // let aluno =  parseInt(req.query.aluno)
        let disciplina =  parseInt(req.query.disc);
        let turma =  parseInt(req.query.tur);
        // console.log(disciplina, turma);
        let values = [disciplina, turma]
        connection.query(`
        SELECT 
        a.nomeAlu,
        f.notaFinal
        FROM final f
        join turma_disciplina td on td.idTD = f.idTD
        join turma t on td.idTur = t.idTur
        join disciplina d on td.idDisc = d.idDisc
        join aluno a on a.idAlu = f.idAlu
        join pontuacao p on p.idAlu = a.idAlu and p.idTD = td.idTD
        #join conteudo c using (idCont)
        where  
        d.idDisc = ?
        and t.idTur = ?
        group by a.nomeAlu`, values, function (err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/pontuacao", async (req, res, next) => {
    try {
        let pontuacao = req.body.pontuacao.toString();
        connection.query("delete from pontuacao where idPon = ?;", pontuacao, function (err, result) {
            if (err) throw err;
            res.json(pontuacao);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/turma", async (req, res, next) => {
    try {
        let turma = req.body.turma.toString();
        connection.query("insert into turma(nomeTur) values (?);", turma, function (err, result) {
            if (err) throw err;
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
            if(err)
                res.json({error: "Ocorreu um erro ao realizar a operação"});
            else
                res.json({success: turma});
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.get("/alunos", async (req, res, next) => {
    try {
        connection.query(`Select al.nomeAlu as nome, al.idAlu as idAluno, t.nomeTur as turma, t.idTur as idTurma from aluno al join turma t on al.idTur = t.idTur;`, function (err, rows, fields) {
            res.json(rows);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.post("/disciplina", async (req, res, next) => {
    try {
        let disciplina = req.body.disciplina;
        connection.query("insert into disciplina(nomeDisc) values (?)", disciplina.toString(), function (err, result) {
            if (err) throw err;
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
        connection.query("insert into aluno(nomeAlu, idTur) values (?, ?)", values, function (err, result) {
            if (err) throw err;
            res.json(values);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

router.delete("/aluno", async (req, res, next) => {
    try {
        let aluno = parseInt(req.body.aluno);
        connection.query("delete from aluno where idAlu = ?", aluno, function (err, result) {
            if (err) throw err;
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
        connection.query(`select * from turma_disciplina where idTur = ? and idDisc = ?;`, values, function(err, result){
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
    } catch (e) {
        console.error(e);
    }
});

router.put("/turma-aluno", async (req, res, next) => {
    try {
        let aluno = parseInt(req.body.aluno);
        let novoNome = req.body.novoAluno.toString();
        let turma = parseInt(req.body.turma);
        let values = [turma, novoNome, aluno]
        connection.query(`update aluno set idTur = ?, nomeAlu = ? where idAlu = ?;`, values, function(err, result){
            if(err) throw err;
            res.json(values);
        }).end;
    } catch (e) {
        console.error(e);
    }
});

// router.delete("/turma", async (req, res, next) => {
//     try {
//         let turma = parseInt(req.body.turma);
//         connection.query("SET FOREIGN_KEY_CHECKS = 0;", null , function(err, result) {
//             if(err) throw err;
//             if (!result.length) {
//                 connection.query("delete from turma where idTur = ?;", turma, function(err, result){
//                     if(err) throw err;
//                         if (!result.length) {
//                             connection.query("SET FOREIGN_KEY_CHECKS = 1;", null, function(err, result){
//                                 if(err) throw err;
//                                 res.json(result);
//                             }).end;
//                         }else 
//                     res.json(result);
//                 }).end;
//             }else 
//                 res.json({result, status:"Turma e disciplina já vinculadas"});
//         }).end;
//     } catch (e) {
//         console.error(e);
//     }
// });

module.exports = router;