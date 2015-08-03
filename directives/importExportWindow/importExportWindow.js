angular.module('importExportWindowModule', [])

    .directive('importExportWindow', function ($rootScope,audioService) {
        return {
            restrict:'C',
            templateUrl:'directives/importExportWindow/importExportWindow.html',
            replace: true,
            link: function(scope)	{



	            var client = new ZeroClipboard( document.getElementById("copyButton") );


	            scope.textAreaData = '';

	            scope.$on("importExport",function(event,data){
		            scope.textAreaData = data;
	            });

	            scope.preventProp = function(e) {
		            e.stopPropagation();
	            };

	            scope.importData = function() {
		            var parsedData = JSON.parse(scope.textAreaData);
		            if (parsedData != null){
			            audioService.len = parsedData.len;
			            audioService.discLength = (4 + (parsedData.len*(audioService.maxLen-4))).toFixed(0);
			            audioService.spd = parsedData.spd;
			            audioService.node.masterGain.gain.value = parsedData.vol;
			            audioService.kit = audioService.kits[parsedData.kitIndex];
			            audioService.kitTemplates = angular.copy(parsedData.kitTemplates);
		            }
		            scope.importExportWindowVisible = !scope.importExportWindowVisible;
		            $rootScope.$broadcast("reCalculateDisc");
	            }

            }
        }
    });