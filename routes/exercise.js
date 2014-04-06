var wordService = require('../service/WordService');

exports.start = function (app) {
    app.get('/exercise', home);
    app.get('/exercise/word', word);
    app.get('/exercise/phrase', phrase);
}

function home(req, res) {
    res.render('exercise/home', {'account': req.cookies.account || {}, 'error': null});
}

function word(req, res) {
    var start = req.query.start || 0;
    if (start < 0) {
        start = 0;
    }
    wordService.page(0, start, 1, function (success, rows) {
        res.render('exercise/word', {
            account: req.cookies.account || {},
            error: null,
            word: rows != null && rows.length > 0 ? rows[0] : {id: null, content: '没有更多的单词了'},
            start: start});
    })
}

function phrase(req, res) {
    var start = req.query.start || 0;
    if (start < 0) {
        start = 0;
    }
    wordService.page(1, start, 1, function (success, rows) {
        res.render('exercise/phrase', {
            account: req.cookies.account || {},
            error: null,
            word: rows != null && rows.length > 0 ? rows[0] : {id: null, content: '没有更多的词组了'},
            start: start});
    })
}
