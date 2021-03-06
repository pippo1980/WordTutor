var userService = require('../service/UserService');

exports.start = function (app) {
    app.get('/regist', doGet);
    app.post('/regist', doPost);
}

function doGet(req, res) {
    res.render('regist', {'account': {'email': ''}, 'error': null});
}

function doPost(req, res) {
    var account = req.body;
    userService.save(account, function (success, info) {
        if (!success) {
            res.render('regist', {'account': account, 'error': info});
        } else {
            res.cookie('account', info);
            res.redirect("exercise");
        }
    })
}