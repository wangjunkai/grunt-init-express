'use strict';

var mongoose = require('mongoose'),
    errorHandler = require('./errors.js'),
    Article = mongoose.model('Article');

/**
 * 添加文章
 */
exports.add = function (req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};
