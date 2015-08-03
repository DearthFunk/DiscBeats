angular.module('kitControlsModule', [])

    .directive('kitControls', function (audioService) {
        return {
            restrict:'C',
            templateUrl:'directives/kitControls/kitControls.html',
            replace: true,
            link: function(scope) {

                scope.resetIndex = -1;
                scope.audioService = audioService;


            }
        }
    });
