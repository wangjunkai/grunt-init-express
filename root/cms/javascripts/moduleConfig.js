'use strict';


define(['jquery', 'angular'], function ($, $$) {

    var modules = ['documentApp'],
        vendors = ['ui.router', 'ngResource', 'ngSanitize'];
    var _each = function (obj, fn) {
        if (obj.constructor == Array && obj.length > 0) {
            for (var i = 0; i <= obj; i++) {
                fn.apply(obj, [i]);
            }
        }
    };
    //创建模块
    _each(modules, function (i) {
        $$.module(this[i]) || $$.module(this[i], vendors);
    });
    //初始化模块
    $$.bootstrap(document, modules);

    return function () {
        return $$.module(modules[0]);
    }
});
