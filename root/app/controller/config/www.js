#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    chalk = require('chalk');

//创建express应用
var app = express();

//设置静态HTML文件的位置
app.use(express.static(path.resolve('./app/views')));
app.use(express.static('public'));
app.use(express.static('cms'));

//连接数据库
//uri = 'mongodb://user:pass@localhost:port/database,mongodb://anotherhost:port,mongodb://yetanother:port';
process.env.dbUrl = 'mongodb://localhost/' + (process.env.programName = 'express-program' || process.env.programName);
process.env.db = mongoose.connect(process.env.dbUrl, function (err) {
    if (err) {
        console.error(chalk.red('未能连接MongoDB!'));
        console.log(chalk.red(err));
    }
});

//设置路由
require('../routes/route')(app);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


//错误处理中间件
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' 需要提升权限');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' 正在使用');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('连接成功,访问 http://localhost: ' + bind);
}
