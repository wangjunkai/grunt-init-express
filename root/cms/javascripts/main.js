'use strict';

var paths = {
    paths: {
        jquery: '/lib/jquery/jquery',
        angular: '/lib/angular/angular',
        angularUiRouter: '/lib/angular-ui-router/release/angular-ui-router',
        angularResource: '/lib/angular-resource/angular-resource',
        angularSanitize: '/lib/angular-sanitize/angular-sanitize'
    }
};
require.config(paths);

require(['jquery', 'angular', 'routeConfig', 'controllerConfig'], function ($, $$, rc, cc) {

    $$ = angular;
    //初始化angular
    var module = rc();
    var controller = cc(module.module);

    //加载模块
    $$.bootstrap(document, module.moduleName);

    //页面dom操作
});
