angular.module('menuModule', [])

    .directive('menu', function ($timeout,$rootScope,audioService,dataService) {
        return {
            restrict:'C',
            templateUrl:'CACHE/directives/menu/menu.html',
            replace: true,
            link: function(scope)	{

                scope.dataService = dataService;
                scope.audioService = audioService;

                scope.editingVol = false;
                scope.editingSpd = false;
                scope.editingLen = false;

	            scope.updateLen = {
		            toRun: function(x) {
			            audioService.playing = false;
			            audioService.discLength = (4 + (audioService.len*(audioService.maxLen-4))).toFixed(0);
			            $rootScope.$broadcast("reCalculateDisc");
		            }
	            };
	            scope.updateLen.toRun(audioService.len);

                scope.changeVisualizer = function(index) {
	                $rootScope.$broadcast("clearCanvasEvent");
                    dataService.visualizerIndex = index;
                };

	            scope.clearDisc = function() {
		            for (var i = 0; i < audioService.kit.length;i++) {
			            for (var x = 0; x < audioService.kit[i].beats.length; x++) {
				            audioService.kit[i].beats[x].active = false;
			            }
		            }
	            }

	            scope.randomize = function() {
		            var kit = audioService.kits[audioService.kitIndex];

		            for (var i = 0; i < kit.length; i++) {
			            for (var x = 0; x < kit[i].beats.length; x++) {
				            kit[i].beats[x].active = Math.random() >= 0.75;
			            }
		            }
	            };

                scope.helpWindow = function() {
                    scope.importExportWindowVisible = false;
                    scope.helpWindowVisible = !scope.helpWindowVisible;
                };

	            scope.importExportWindow = function() {
                    scope.helpWindowVisible = false;
                    scope.importExportWindowVisible = !scope.importExportWindowVisible;
                    var data = JSON.stringify({
	                    vol: audioService.node.masterGain.gain.value,
	                    spd: audioService.spd,
	                    len: audioService.len,
	                    kitIndex: audioService.kitIndex,
	                    kitTemplates: angular.copy(audioService.kitTemplates)
                    });
                    $rootScope.$broadcast("importExport",data);
                };

                scope.changeKit = function(index) {
	                audioService.switchKitTemplate(index);
                };

                scope.resetkit = function(index) {
	                audioService.kitTemplates[index] = angular.copy(audioService.kitTemplates[index]);
                    scope.resetIndex = index;
                    $timeout(function() {
                        scope.resetIndex = -1;
                    },400)
                }

            }
        }
    });