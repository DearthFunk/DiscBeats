angular.module('visualizerModule', [])

    .directive('visualizer', function ($window, $timeout, $rootScope, audioService) {
        return {
            restrict:'C',
            link: function(scope,element)	{

	            var cnv = element[0];
	            var ctx = cnv.getContext("2d");
	            var w, h,xCenter,yCenter = 0;
	            var prom;
	            var animations = {};

	            $rootScope.$on('windowResizeEvent',function(){resizeEvent();});
	            $rootScope.$on('clearCanvasEvent', function(){clearCanvas();});
	            $rootScope.$on('playSampleEvent',function(e,index){ if (visuals[index]) { visuals[index].addToVals(); } });

				function resizeEvent() {
					w = $window.innerWidth;
					h = $window.innerHeight;
					cnv.style.width = w +'px';
					cnv.style.height = h + 'px';
					xCenter = (w-scope.menuSize)/2;
					yCenter = h/ 2;
					angular.element(cnv).attr({width:  w, height: h	});
					for (var i = 0; i < visuals.length; i++) {
						if ('w' in visuals[i]) {visuals[i].w = w;}
						if ('h' in visuals[i]) {visuals[i].h = h;}
						if ('xCenter' in visuals[i]) {visuals[i].xCenter = xCenter;}
						if ('yCenter' in visuals[i]) {visuals[i].yCenter = yCenter;}
						if ('rad' in visuals[i]) {visuals[i].rad = audioService.kit[audioService.kit.length-1].rad}
					}
				}


	            function clearCanvas() {
		            ctx.clearRect(0, 0, w, h);
	            }

	            animations.animate = function() {
		            clearCanvas();
		            for (var i = 0; i < visuals.length; i++) {
			            visuals[i].draw();
		            }
		            prom = $timeout(animations.animate, 20);
	            };


	            var visuals = [
		            new SideCircles({ctx:ctx,xCenter:xCenter,yCenter:yCenter,rad:audioService.kit[audioService.kit.length-1].rad}),
		            new CircleFades({ctx:ctx,w:w,h:h,clr:"#FFFFFF"}),
		            new Splatter({ctx:ctx,w:w,h:h,clr:"#FF0000"}),
		            new Spinner({ctx:ctx,xCenter:xCenter,yCenter:yCenter,rad:audioService.kit[audioService.kit.length-1].rad}),
		            new LargeCircle({ctx:ctx,xCenter:xCenter,yCenter:yCenter,rad:audioService.kit[audioService.kit.length-1].rad}),
		            new Bubbles({ctx:ctx,w:w,h:h}),
		            new CircleFades({ctx:ctx,w:w,h:h,clr:"#000000"}),
		            new Splatter({ctx:ctx,w:w,h:h,clr:"#000000"})
	            ];

	            resizeEvent();
	            animations.animate();
            }
        }
    });