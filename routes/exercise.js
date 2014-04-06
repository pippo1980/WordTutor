var wordService = require('../service/WordService');

exports.start = function (app) {
    app.get('/exercise', home);
    app.get('/exercise/word', word);
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
            word: rows != null ? rows[0] : {},
            start: rows != null && rows.length > 0 ? start : start - 1});
    })
}
