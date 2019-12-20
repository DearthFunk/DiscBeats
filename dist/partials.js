angular.module('discBeats').run(['$templateCache', function($templateCache) {$templateCache.put('CACHE/directives/helpWindow/helpWindow.html','<div class="helpWindowContainer" data-ng-click="helpWindowVisible = !helpWindowVisible" data-ng-mouseMove="preventProp($event)">\r\n    <div class="inner" data-ng-click="preventProp($event)">\r\n        <i class="fa fa-close" data-ng-click="helpWindowVisible = !helpWindowVisible"></i>\r\n\r\n        <div class="contents verticalScrollBarDark">\r\n            <hr>\r\n            This project is based on another application I found online (same samples and same style animations), but I\r\n            cannot seem to locate it again in order to give props to them. If you have seen something similar to this, please\r\n            let me know <a href="mailto:dearth@dearthfunk.com">dearth@dearthfunk.com</a>.\r\n            <hr>\r\n            Disc Beats, is a drum machine in the shape of disc... Ta Da! ;)<br>\r\n            Each ring in the disc is a sample and each slice of that disc is sample.<br>\r\n            Click a beat to toggle it on/off.\r\n\r\n            <br><Br>\r\n\r\n            <span>HELP/INFO</span><br>Open this, the help window.<br><br>\r\n            <span>IMPORT/EXPORT</span><br>Import/Export your settings a text file (in case you clear your cache).<br><br>\r\n            <span>RANDOMIZE</span><br>Randomize the disc.<br><br>\r\n            <span>CLEAR</span><br>Clear the disc.<br><br>\r\n\r\n            <span>VOL</span><br>This is the overall volume of the application<br><br>\r\n            <span>SPD</span><br>This is how fast the step sequencer runs<br><br>\r\n            <span>LEN</span><br>This is how long the step sequencer is (from 4 to 32 beats)<br><br>\r\n            <span>KITS</span><br>There are 6 sample sets with preset FX for the TREMOLO, DELAY, and BIT CRUSHER.<br><br>\r\n\r\n            <span>KEYBOARD CONTROLS</span><br>\r\n            <b>Space Bar</b>: used to start/stop playback<br>\r\n            <b>A</b>: toggle Tremolo Active/Inactive<br>\r\n            <b>S</b>: toggle Delay Active/Inactive<br>\r\n            <b>D</b>: toggle Bit Crusher Active/Inactive<br>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n');
$templateCache.put('CACHE/directives/importExportWindow/importExportWindow.html','<div class="importExportWindowContainer" data-ng-click="preventProp($event)">\r\n    <div class="inner">\r\n        <i class="fa fa-close" data-ng-click="importExportWindowVisible = !importExportWindowVisible"></i>\r\n\r\n        <textarea id="textAreaToCopy" data-ng-model="textAreaData"></textarea>\r\n        <div class="button" data-ng-click="importData()">IMPORT</div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n');
$templateCache.put('CACHE/directives/kitControls/kitControls.html','<div class="kitControlsContainer verticalScrollBarLight">\r\n\r\n    <div class="section {{!audioService.fx.tremolo.bypass}}">\r\n        <span class="title" data-ng-click="audioService.fx.tremolo.bypass = !audioService.fx.tremolo.bypass">Tremolo</span>\r\n        <div class="knob" data-label="\'Int\'" data-size="55" data-knob-value="audioService.fx.tremolo.intensity"></div>\r\n        <div class="knob" data-label="\'Rat\'" data-size="55" data-min-value="0.1" data-max-value="11" data-knob-value="audioService.fx.tremolo.rate"></div>\r\n        <div class="knob" data-label="\'Phs\'" data-size="55" data-min-value="0" data-max-value="180" data-knob-value="audioService.fx.tremolo.stereoPhase"></div>\r\n    </div>\r\n\r\n    <div class="section {{!audioService.fx.delay.bypass}}">\r\n        <span class="title" data-ng-click="audioService.fx.delay.bypass = !audioService.fx.delay.bypass">Delay</span>\r\n        <div class="knob" data-label="\'Wet\'" data-size="55" data-knob-value="audioService.fx.delay.wetLevel.value"></div>\r\n        <div class="knob" data-label="\'Dry\'" data-size="55" data-knob-value="audioService.fx.delay.dryLevel.value"></div>\r\n        <div class="knob" data-label="\'Fbk\'" data-size="55" data-knob-value="audioService.fx.delay.feedback.value"></div>\r\n        <div class="knob" data-label="\'Dly\'" data-min-value="0" data-max-value="300" data-size="55" data-knob-value="audioService.fx.delay.delayTime.value"></div>\r\n        <div class="knob" data-label="\'Cut\'" data-min-value="20" data-max-value="22050" data-size="55" data-knob-value="audioService.fx.delay.cutoff.value"></div>\r\n    </div>\r\n\r\n    <div class="section noBottomBorder {{!audioService.fx.bitcrusher.bypass}}">\r\n        <span class="title" data-ng-click="audioService.fx.bitcrusher.bypass = !audioService.fx.bitcrusher.bypass">Bit Crusher</span>\r\n        <div class="knob" data-label="\'Bit\'" data-min-value="1" data-max-value="16" data-size="55" data-knob-value="audioService.fx.bitcrusher.bits"></div>\r\n        <div class="knob" data-label="\'Siz\'" data-min-value="256" data-max-value="16384" data-size="55" data-knob-value="audioService.fx.bitcrusher.bufferSize"></div>\r\n        <div class="knob" data-label="\'Frq\'" data-min-value="0.0001" data-max-value="1" data-size="55" data-knob-value="audioService.fx.bitcrusher.normFreq"></div>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('CACHE/directives/menu/menu.html','<div class="menuContainer" data-ng-style="{width: menuSize + \'px\'}" id="menuContainer">\r\n    <div class="button border" data-ng-click="helpWindow()">HELP / INFO</div>\r\n    <div class="button border" data-ng-click="importExportWindow()">IMPORT / EXPORT</div>\r\n    <div class="button border" data-ng-click="randomize()">RANDOMIZE</div>\r\n    <div class="button border" data-ng-click="clearDisc()">CLEAR DISC</div>\r\n    <table class="sliders border">\r\n        <tr><td class="label">{{editingVol ? audioService.node.masterGain.gain.value.toFixed(1) : \'VOL\'}}</td>\r\n            <td><div class="sliderHorizontal" data-currently-moving="editingVol" data-slider-value="audioService.node.masterGain.gain.value"></div></td>\r\n        </tr>\r\n        <tr><td class="label">{{editingSpd ? audioService.spd.toFixed(1) : \'SPD\'}}</td>\r\n            <td><div class="sliderHorizontal" data-currently-moving="editingSpd" data-slider-value="audioService.spd"></div></td>\r\n        </tr>\r\n        <tr><td class="label">{{editingLen ? audioService.discLength : \'LEN\'}}</td>\r\n            <td><div class="sliderHorizontal" data-currently-moving="editingLen" data-slider-value="audioService.len" data-call-back="updateLen"></div></td>\r\n        </tr>\r\n    </table>\r\n\r\n    <div class="selector border">\r\n        <span class="title">KITS</span>\r\n        <div class="button" data-ng-click="changeKit($index)" data-ng-right-click="resetKit($index)" data-ng-repeat="item in audioService.kitTemplates track by $index">\r\n            <div class="inner {{$index == audioService.kitIndex}}">{{$index == resetIndex ? \'X\' : \'\'}}</div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="animation kitControls" data-ng-hide="showHelpScreen"></div>\r\n\r\n</div>\r\n');
$templateCache.put('CACHE/elements/sliderHorizontal/sliderHorizontal.html','<div class="sliderHorizontalContainer" data-ng-mousedown="movePos($event)">\r\n    <div class="horizontalBar">\r\n        <div class="sliderThumbContainer"\r\n            data-ng-style="{width: thumbWidth + \'px\', left: ( sliderValue * (width - thumbWidth)) + \'px\'}"\r\n            data-ng-mousedown="startMovingSlider($event)"\r\n            data-ng-dblclick="resetToOriginal()">\r\n            <div class="sliderThumb"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n');}]);