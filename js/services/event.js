angular.module('eventServiceModule', [])
    .directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    })
    .directive('html', function($rootScope,$window, audioService){
        return {
            restrict: 'E',
            link: function(scope,element){

            //window events
                $window.onblur = function(event) { $rootScope.$broadcast("windowBlurEvent",event); };
                $window.onresize = function()    { $rootScope.$broadcast("windowResizeEvent",event); };
                $window.onbeforeunload = function(){
	                audioService.switchKitTemplate(audioService.kitIndex);
	                localStorage.setItem('discBeatsLocalStorage', JSON.stringify({
		               active: true,
	                   vol: audioService.node.masterGain.gain.value,
	                   spd: audioService.spd,
	                   len: audioService.len,
		               kits: audioService.kits,
	                   kitIndex: audioService.kitIndex,
	                   kitTemplates: angular.copy(audioService.kitTemplates)
                   }));

                };

            //mouse events
                element.bind("mousewheel", function(e){
                    if (e.target.localName != "textarea") {
                        $rootScope.$broadcast("mouseWheelEvent",e);
                    }
                });
                element.bind("mousemove", function(e) {
                    if (e.target.localName != "textarea") {
	                    $rootScope.$broadcast("mouseMoveEvent",e);
                    }
                });
                element.bind("mousedown", function(e) {
                    if (e.target.localName != "textarea") {
                        $rootScope.$broadcast("mouseDownEvent",e);
                    }
                });
                element.bind("mouseup", function(e){
                    if (e.target.localName != "textarea") {
                        $rootScope.$broadcast("mouseUpEvent",e);
                    }
                });

            //keyboard events
                element.bind("keydown", function(e){
                    if (e.target.localName != "textarea") {
	                    $rootScope.$broadcast("keyDownEvent",e);
                    }
                });
                element.bind("keyup", function(e) {

                    if (e.target.localName != "textarea") {
	                    $rootScope.$broadcast("keyUpEvent",e);
                    }
                });
            }
        }
    });

