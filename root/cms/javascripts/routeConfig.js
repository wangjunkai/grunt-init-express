'use strict';


//设置项目的angular模块和路由
define(['jquery', 'angular'], function ($, $$) {

    //模块的名称
    var modules = ['documentApp'],
    //模块的依赖项
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

    var module = $$.module(modules[0]);
    //设置模块的路由
    module.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function ($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(false);
            // 设置没有路由的情况
            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise('/');
        }
    ]);

    //返回当前创建的模块
    return function () {
        return module;
    };

});
