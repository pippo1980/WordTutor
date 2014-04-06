var path = require('path')
var userService = require(path.join(process.cwd(), 'service/UserService'));

exports.start = function (app) {
    app.get('/', index);
    app.post('/login', login);
}

function index(req, res) {
    res.render('index', {'account': {'email': ''}, 'error': null});
}

function login(req, res, next) {
    var account = req.body;
    console.log("account:[", account, ":]try to login");
    userService.login(account, function (success, account) {
        if (!success) {
            res.render('index', {'account': account, 'error': '用户名密码不正确'});
        } else {
            res.cookie('account', info, {maxAge: -1, path: '/'});
            res.redirect("/exercise");
        }
    });
}