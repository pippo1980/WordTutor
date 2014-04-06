var uuid = require('node-uuid');
var template = require('./SqliteTemplate');

exports.getWordNote = function (word_id, user_id, handler) {
    template.get("select * from note_t where word_id=? and user_id=?", [word_id, user_id], function (success, row) {
        handler(success, row);
    });
}

exports.persist = function (note, handler) {
    if (note.id == null || note.id == '') {
        template.update("insert into note_t values($id, $content, $word_id, $user_id)",
            {$id: uuid.v4(), $content: note.content, $word_id: note.word_id, $user_id: note.user_id},
            function (success) {
                handler(success, success ? note : "保存失败");
            });
    } else {
        template.update("update note_t set content=$content where id=$id", {$id: note.id, $content: note.content}, function (success) {
            handler(success, success ? note : "更新失败");
        });
    }
}