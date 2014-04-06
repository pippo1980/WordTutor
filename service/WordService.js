var uuid = require('node-uuid');
var template = require('./SqliteTemplate');

exports.list = function (handler) {
    template.find("select * from word_t", [], function (success, rows) {
        handler(success, rows);
    });
}

exports.persist = function (word, handler) {
    if (word.id == null) {
        template.update("insert into word_t values($id, $content, $word_type)",
            {$id: uuid.v4(), $content: word.content, $word_type: word.word_type},
            function (success) {
                handler(success, success ? word : "保存失败");
            });
    } else {
        template.update("update word_t set content=$content, word_type=$word_type where id=$id)",
            {$id: word.id, $content: word.content, $word_type: word.word_type},
            function (success) {
                handler(success, success ? word : "更新失败");
            });
    }
}