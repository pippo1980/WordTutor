exports.start = function (app) {
    app.get('/manage/word', home);
}

function home(req, res) {
    res.render('manage/word', {'account': req.cookies.account || {}, 'error': null});
}