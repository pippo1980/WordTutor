var noteSerivce = require('../service/NoteService');

exports.start = function (app) {
    app.get('/note/word/:word_id', getWordNote);
    app.post('/note/word', persist);
}

function getWordNote(req, res) {
    noteSerivce.getWordNote(req.params.word_id, req.cookies.account.id, function (success, row) {
        //console.log(row);
        var note = row != null ? row : {id: null, content: ''}
        res.send(note);
    });
}

function persist(req, res) {
    var note = req.body;
    note.user_id = req.cookies.account.id;
    noteSerivce.persist(note, function (success, info) {
        res.send(info);
    })
}