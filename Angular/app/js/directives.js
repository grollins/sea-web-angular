'use strict';

/* Directives */

var dirs = angular.module('angularProject.directives', []);

dirs.directive('file', function() {
    return {
        scope: {
            file: '='
        },
        link: function(scope, el, attrs) {
            el.bind('change', function(event) {
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});
