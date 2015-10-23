'use strict';


define(['jquery', 'angular'], function ($, $$) {
    return function (module) {
        module.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($locationProvider, $stateProvider, $urlRouterProvider) {
                $locationProvider.html5Mode(false);
                // 设置没有路由的情况
                $urlRouterProvider.when('', '/');
                $urlRouterProvider.otherwise('/');
            }
        ]);
    }

});
