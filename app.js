/**
 * Module dependencies.
 */
var path = require('path');

var express = require('express');
var app = express();

app.locals({
    title: '背单词',
    author: 'pippo',
    email: 'pippo1980.du@gmail.com'
});

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.favicon(path.join(__dirname, 'static/images/favicon.ico')));

app.use(express.logger('dev'));
app.use(express.cookieParser('8156'));
app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes/index').start(app);
require('./routes/regist').start(app);
require('./routes/exercise').start(app);
require('./routes/word_manage').start(app);

var http = require('http');
http.createServer(app).listen(app.get('port'), function () {
    console.log('WordTutor server listening on port ' + app.get('port'));
});
