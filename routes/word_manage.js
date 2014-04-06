var wordService = require('../service/WordService');

exports.start = function (app) {
    app.get('/manage/word', home);
    app.post('/manage/word', persist);
}

function home(req, res) {
    wordService.list(function (success, rows) {
        res.render('manage/word', {account: req.cookies.account || {}, error: null, words: success ? rows : []});
    });
}

function persist(req, res) {
    var word = req.body;
    //console.log(word)
    wordService.persist(word, function (success, info) {
        res.redirect("/manage/word")
    });
}