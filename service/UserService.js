var uuid = require('node-uuid');
var template = require('./SqliteTemplate');

exports.login = function (account, handler) {
    template.get("select * from user_t where email=? and password=?", [account.email, account.password], function (success, row) {

        if (row != null) {
            account['id'] = row.id;
            account['name'] = row.name;
        }
        //console.log(handler);
        handler(row != null, account);
    });
}

exports.save = function (account, handler) {

    template.get("select * from user_t where email=?", account.email, function (success, row) {
        //console.log(row)
        if (success && row != null) {
            handler(false, "邮箱:[" + account.email + "]已注册");
            return;
        }

        template.update("insert into user_t values($id, $name, $email, $password)",
            {$id: uuid.v4(), $name: account.name, $email: account.email, $password: account.password},
            function (success) {
                handler(success, success ? account : "保存失败");
            });
    });

}