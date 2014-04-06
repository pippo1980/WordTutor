var wordService = require('../service/WordService');

exports.start = function (app) {
    app.get('/manage/word', home);
    app.get('/manage/word/:id', getById);
    app.delete('/manage/word/:id', deleteById);
    app.post('/manage/word', persist);
}

function home(req, res) {
    wordService.list(function (success, rows) {
        res.render('manage/word', {account: req.cookies.account || {}, error: null, words: success ? rows : []});
    });
}

function getById(req, res) {
    var id = req.params.id;
    wordService.getById(id, function (success, info) {
        res.send(info != null ? info : {});
    })
}

function deleteById(req, res) {
    var id = req.params.id;
    wordService.deleteById(id, function (success) {
        //res.redirect(301, "/manage/word")
        res.send({});
    })
}

function persist(req, res) {
    var word = req.body;
    //console.log(word)
    wordService.persist(word, function (success, info) {
        res.redirect(301, "/manage/word")
    });
}