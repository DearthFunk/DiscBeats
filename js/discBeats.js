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
    function discController( $scope ){
        $scope.importExportWindowVisible = false;
        $scope.helpWindowVisible = false;
	    $scope.menuSize = 220;
    }
);
