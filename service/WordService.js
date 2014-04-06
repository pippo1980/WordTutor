var uuid = require('node-uuid');
var template = require('./SqliteTemplate');

exports.getById = function (id, handler) {
    template.get("select * from word_t where id=?", [id], function (success, row) {
        handler(success, row);
    });
}

exports.list = function (handler) {
    template.find("select * from word_t", [], function (success, rows) {
        handler(success, rows);
    });
}

exports.page = function (word_type, start, limit, handler) {
    template.find("select * from word_t where word_type=? limit ? offset ?", [word_type, limit, start], function (success, rows) {
        handler(success, rows);
    });
}

exports.persist = function (word, handler) {
    if (word.id == null || word.id == '') {
        template.update("insert into word_t values($id, $content, $word_type)",
            {$id: uuid.v4(), $content: word.content, $word_type: word.word_type},
            function (success) {
                handler(success, success ? word : "保存失败");
            });
    } else {
        template.update("update word_t set content=$content, word_type=$word_type where id=$id",
            {$id: word.id, $content: word.content, $word_type: word.word_type},
            function (success) {
                handler(success, success ? word : "更新失败");
            });
    }
}

exports.deleteById = function (id, handler) {
    template.update("delete from word_t where id=?", [id], function (success) {
        handler(success);
    });
}