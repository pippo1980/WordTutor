exports.start = function (app) {
    app.get('/exercise', home);
}

function home(req, res) {
    res.render('exercise/home', {'account': req.cookies.account || {}, 'error': null});
}

