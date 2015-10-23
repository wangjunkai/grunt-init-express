'use strict';

module.exports = function (app) {

    var index = require('../server/index.js');

    //设置路由
    app.route('/').get(index.index);

};
