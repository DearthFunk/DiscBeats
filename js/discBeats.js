angular.module('discBeats', [

    "eventServiceModule",
    "audioServiceModule",
	"dataServiceModule",

    "knobElement",
	"sliderHorizontalElement",

    "importExportWindowModule",
    "helpWindowModule",
    "kitControlsModule",
    "menuModule",
	"discModule",
	"visualizerModule"


])
.controller('discController',
    function discController( $scope, audioService){
        $scope.importExportWindowVisible = false;
        $scope.helpWindowVisible = false;
	    $scope.menuSize = 220;
        $scope.showInitAudiocontextMessage = true;

	    $scope.initAudioContext = function(event){
	        $scope.showInitAudiocontextMessage = false;
            audioService.initAudioContext();
            audioService.audioCtx.resume();
        };
    }
);
