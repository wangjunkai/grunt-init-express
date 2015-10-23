'use strict';


require(['jquery', 'angular', 'moduleConfig', 'routeConfig','controller'], function ($, $$, mc, rc,cc) {
    $$.element(document).ready(function () {
        var module = mc();
        var route = rc(module);
        var controller = c(module);
    });

    $(document).on('isready',function(){

    });
});
