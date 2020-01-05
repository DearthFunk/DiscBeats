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

var Bubbles = (function() {
	function Bubbles(config) {
		this.vals = [];
		this.ctx = config.ctx;
		this.w = config.w;
		this.h = config.h;
	}

	Bubbles.prototype.addToVals = function() {
		for (var i = 0; i < 100; i++) {
			this.vals.push({
				x: Math.random() * this.w,
				y: this.h + 20 + (Math.random()*60),
				r: Math.random() * 20 + 10,
				c: "#" + ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase(),
				s: Math.random() * 5 + 3
			});
		}
	};

	Bubbles.prototype.draw = function() {

		for (var i = 0; i < this.vals.length; i++) {
			this.vals[i].r -= 0.6;
			this.vals[i].y -= this.vals[i].s;
			if (this.vals[i].r <= 0) {
				this.vals.splice(i,1);
			}
			else {
				this.ctx.beginPath();
				this.ctx.fillStyle = this.vals[i].c;
				this.ctx.arc(this.vals[i].x,this.vals[i].y,this.vals[i].r,0,Math.PI*2,false);
				this.ctx.fill();
				this.ctx.closePath();
			}
		}
	};

	return Bubbles;
})();
var CircleFades = (function() {
	function CircleFades(config) {
		this.vals = [];
		this.ctx = config.ctx;
		this.w = config.w;
		this.h = config.h;
		this.clr = config.clr;
	}

	CircleFades.prototype.addToVals = function() {
		for (var i =0; i < 5; i++) {
			this.vals.push({
				x: Math.random() * this.w,
				y: Math.random() * this.h,
				r: Math.random() * 120 + 40
			})
		}
	};
	CircleFades.prototype.draw = function() {
		for (var i = 0; i < this.vals.length; i++) {
			this.vals[i].r -= 5.5;
			if (this.vals[i].r < 0) {
				this.vals.splice(i,1);
			}
			else {
				this.ctx.beginPath();
				this.ctx.strokeStyle = this.clr;
				this.ctx.lineWidth = 3;
				this.ctx.arc(this.vals[i].x,this.vals[i].y,this.vals[i].r,0,Math.PI*2,false);
				this.ctx.stroke();
				this.ctx.closePath();
			}
		}
	};

	return CircleFades;
})();
var LargeCircle = (function() {
	function LargeCircle(config) {
		this.vals = [];
		this.ctx = config.ctx;
		this.xCenter = config.xCenter;
		this.yCenter = config.yCenter;
		this.rad = config.rad;
	}

	LargeCircle.prototype.addToVals = function() {
		this.vals.push({r:this.rad});
	};

	LargeCircle.prototype.draw = function() {

		for (var i = 0; i < this.vals.length; i++) {
			this.vals[i].r += 10;
			if (this.vals[i].r > this.rad*2) {
				this.vals.splice(i,1);
			}
			else {
				this.ctx.beginPath();
				this.ctx.lineWidth = 1;
				this.ctx.strokeStyle = 'rgba(0,0,0,' + (this.vals[i].r / (this.rad*2)) + ')';
				this.ctx.arc(this.xCenter,this.yCenter,this.vals[i].r,0,Math.PI*2,false);
				this.ctx.stroke();
				this.ctx.closePath();
			}
		}
	};

	return LargeCircle;
})();
var SideCircles = (function() {
	function SideCircles(config) {
		this.vals = [];
		this.circleRad = 0;
		this.revDirection = false;
		this.ctx = config.ctx;
		this.xCenter = config.xCenter;
		this.yCenter = config.yCenter;
		this.rad = config.rad;
	}

	SideCircles.prototype.addToVals = function() {
		if (this.vals.length == 0) {
			this.vals = [
				{x:this.xCenter-this.rad,y:this.yCenter},
				{x:this.xCenter+this.rad,y:this.yCenter}
			];
		}
	};

	SideCircles.prototype.draw = function() {
		for (var i = 0; i < this.vals.length; i++) {
			if (i == 0){this.circleRad += this.revDirection ? -10 : 10;}

			if (this.circleRad < 0) {
				this.vals = [];
				this.revDirection = false;
				this.circleRad = 0;
			}
			else {
				if (this.circleRad > 200 && i ==0) {
					this.revDirection = !this.revDirection;
				}

				this.ctx.beginPath();
				this.ctx.fillStyle = "#FF0000";
				this.ctx.arc(this.vals[i].x,this.vals[i].y,this.circleRad,0,Math.PI*2,false);
				this.ctx.fill();
				this.ctx.closePath();
			}
		}
	};

	return SideCircles;
})();
var Spinner = (function() {
	function Spinner(config) {
		this.vals = [];
		this.ctx = config.ctx;
		this.xCenter = config.xCenter;
		this.yCenter = config.yCenter;
		this.rad = config.rad;
	}

	Spinner.prototype.addToVals = function() {
		for (var i = 0; i < 3; i++) {
			this.vals.push({
				size: 100,
				angle: Math.random() * Math.PI * 2,
				speed: Math.random() * 4 / 100,
				clr: "#" + ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase()
			});
		}

	};
	Spinner.prototype.draw = function() {
		for (var i = 0; i < this.vals.length; i++) {
			this.vals[i].size -= 2;
			if (this.vals[i].size <= 0) {
				this.vals.splice(i,1);
			}
			else {
				this.vals[i].angle += this.vals[i].speed;
				this.vals[i].x = this.xCenter + Math.cos(this.vals[i].angle) * this.rad;
				this.vals[i].y = this.yCenter + Math.sin(this.vals[i].angle) * this.rad;
				this.ctx.beginPath();
				this.ctx.fillStyle = this.vals[i].clr;
				this.ctx.arc(this.vals[i].x, this.vals[i].y, this.vals[i].size, 0, Math.PI*2, true);
				this.ctx.fill();
				this.ctx.closePath();

			}
		}
	};

	return Spinner;
})();
var Splatter = (function() {
	function Splatter(config) {
		this.vals = [];
		this.ctx = config.ctx;
		this.w = config.w;
		this.h = config.h;
		this.clr = config.clr;
	}

	Splatter.prototype.addToVals = function() {
		var xMid = Math.random() * this.w;
		var yMid = Math.random() * this.h;
		for (var i = 0; i < 60; i++) {
			var r = Math.random() * 300;
			var a = Math.random() * 360;
			var spd = Math.random() * 5 / 10 + 0.1;
			this.vals.push({
				x: xMid + (r * Math.cos(a)),
				y: yMid + (r * Math.sin(a)),
				r: Math.random() * 4 + 4,
				spd: Math.round(spd * 100) / 100
			})
		}
	};
	Splatter.prototype.draw = function() {
		for (var i = 0; i < this.vals.length; i++) {
			this.vals[i].r -= this.vals[i].spd;
			if (this.vals[i].r <= 0) {
				this.vals.splice(i,1);
			}
			else {
				this.ctx.beginPath();
				this.ctx.fillStyle = this.clr;
				this.ctx.arc(this.vals[i].x,this.vals[i].y,this.vals[i].r,0,Math.PI*2,false);
				this.ctx.fill();
				this.ctx.closePath();
			}
		}

	};

	return Splatter;
})();
angular.module('audioServiceModule', [])
	.service("audioService", function($window,$timeout,$rootScope, dataService){

		var clickPromise;
		var totalSamples = 0;
		var audioService = this;
		var audioCtx = null;
		var nextNoteTime = null;
		var tuna = null;

		audioService.audioCtx = audioCtx;
		audioService.init = init;
		audioService.initAudioContext = initAudioContext;
		audioService.switchKitTemplate = switchKitTemplateIndex;
		audioService.loadKit = loadKit;
		audioService.clickTrackPlayer = clickTrackPlayer;

		$rootScope.$on('keyDownEvent', keyDownEvent);

		audioService.init();

		///////////////////////////////////////////////////////

		function init(){
			audioService.kitTemplates = angular.isObject(dataService.storage) ?
				dataService.storage.kitTemplates :
				[
					{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:true,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:100}},
					{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:30}},
					{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.718999981880188,dryLevel:1,feedback:0.593999981880188,delayTime:121.9749984741211,cutoff:20000},tremolo:{bypass:true,intensity:0.831,rate:0.594,stereoPhase:0}},
					{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:true,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:180}},
					{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:1,dryLevel:0,feedback:0.6940000057220459,delayTime:16.975000381469727,cutoff:3752.875},tremolo:{bypass:true,intensity:0.875,rate:1,stereoPhase:0}},
					{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:0}}
				];
			audioService.kitIndex =       angular.isObject(dataService.storage) ? dataService.storage.kitIndex : 0;
			audioService.spd =            angular.isObject(dataService.storage) ? dataService.storage.spd : 0.5;
			audioService.len =            angular.isObject(dataService.storage) ? dataService.storage.len : 0.5;
			audioService.maxLen = 24;
			audioService.playing = false;
			audioService.clickTrack = 0;
			audioService.discs = [];
			audioService.node = {};
			audioService.fx = {};
			audioService.kits = [
				[
					{fileUrl: "samples/kit0/fx01.mp3"},
					{fileUrl: "samples/kit0/fx02.mp3"},
					{fileUrl: "samples/kit0/fx03.mp3"},
					{fileUrl: "samples/kit0/fx04.mp3"},
					{fileUrl: "samples/kit0/fx05.mp3"},
					{fileUrl: "samples/kit0/fx06.mp3"},
					{fileUrl: "samples/kit0/fx07.mp3"}
				],
				[
					{fileUrl: "samples/kit1/fx08.mp3"},
					{fileUrl: "samples/kit1/fx09.mp3"},
					{fileUrl: "samples/kit1/fx10.mp3"},
					{fileUrl: "samples/kit1/fx11.mp3"},
					{fileUrl: "samples/kit1/fx12.mp3"},
					{fileUrl: "samples/kit1/fx13.mp3"}
				],
				[
					{fileUrl: "samples/kit2/fx14.mp3"},
					{fileUrl: "samples/kit2/fx15.mp3"},
					{fileUrl: "samples/kit2/fx16.mp3"},
					{fileUrl: "samples/kit2/fx17.mp3"},
					{fileUrl: "samples/kit2/fx18.mp3"}
				],
				[
					{fileUrl: "samples/kit3/fx19.mp3"},
					{fileUrl: "samples/kit3/fx20.mp3"},
					{fileUrl: "samples/kit3/fx21.mp3"},
					{fileUrl: "samples/kit3/fx22.mp3"},
					{fileUrl: "samples/kit3/fx23.mp3"}
				],
				[
					{fileUrl: "samples/kit4/fx24.mp3"},
					{fileUrl: "samples/kit4/fx25.mp3"},
					{fileUrl: "samples/kit4/fx26.mp3"},
					{fileUrl: "samples/kit4/fx27.mp3"},
					{fileUrl: "samples/kit4/fx28.mp3"},
					{fileUrl: "samples/kit4/fx29.mp3"},
					{fileUrl: "samples/kit4/fx30.mp3"},
					{fileUrl: "samples/kit4/fx31.mp3"}
				],
				[
					{fileUrl: "samples/kit5/fx32.mp3"},
					{fileUrl: "samples/kit5/fx33.mp3"},
					{fileUrl: "samples/kit5/fx34.mp3"},
					{fileUrl: "samples/kit5/fx35.mp3"},
					{fileUrl: "samples/kit5/fx36.mp3"},
					{fileUrl: "samples/kit5/fx37.mp3"},
					{fileUrl: "samples/kit5/fx38.mp3"},
					{fileUrl: "samples/kit5/fx39.mp3"}
				]
			];
			if (angular.isObject(dataService.storage)) {
				audioService.kits = angular.copy(dataService.storage.kits);
			}
			else {
				for (var kit = 0; kit < audioService.kits.length; kit++) {
					audioService.kits[kit].push({}); // push an extra sample just for calculations
					for (var sample = 0; sample < audioService.kits[kit].length; sample++) {
						audioService.kits[kit][sample].kit = kit;
						audioService.kits[kit][sample].rad = 0;
						audioService.kits[kit][sample].beats = [];
						var fromStorage = angular.isObject(dataService.storage);
						for (var i = 0; i < audioService.maxLen; i++) {
							audioService.kits[kit][sample].beats.push({
								a1:0,
								a2:0,
								x: 0,
								y: 0,
								active: fromStorage ? dataService.storage.beats[kit][sample].beats[i] : false
							});
						}
					}
				}
			}
		}

		function initAudioContext(){
			audioService.audioCtx = typeof AudioContext !== 'undefined' ?	new AudioContext() : typeof webkitAudioContext !== 'undefined' ? new webkitAudioContext() :	null;
			nextNoteTime = audioService.audioCtx.currentTime;
			tuna = new Tuna(audioService.audioCtx);

			audioService.node.stopper = audioService.audioCtx.createGain();
			audioService.node.masterGain = audioService.audioCtx.createGain();
			audioService.node.masterGain.gain.value = angular.isObject(dataService.storage) ? dataService.storage.vol : 0.5;
			audioService.node.javascript = audioService.audioCtx.createScriptProcessor(1024, 0, 1);
			audioService.node.analyser = audioService.audioCtx.createAnalyser();

			audioService.fx.tremolo = new tuna.Tremolo();
			audioService.fx.delay = new tuna.Delay();
			audioService.fx.bitcrusher = new tuna.Bitcrusher();

			audioService.node.stopper.connect   (audioService.fx.tremolo.input);
			audioService.fx.tremolo.connect   (audioService.fx.delay.input);
			audioService.fx.delay.connect     (audioService.fx.bitcrusher.input);
			audioService.fx.bitcrusher.connect(audioService.node.masterGain);
			audioService.node.masterGain.connect(audioService.node.analyser);
			audioService.node.masterGain.connect(audioService.audioCtx.destination);
			audioService.node.analyser.smoothingTimeConstant = 0.3;
			audioService.node.analyser.fftSize = 1024 / 2;
			audioService.node.analyser.connect(audioService.node.javascript);
			audioService.node.javascript.connect(audioService.audioCtx.destination);

			for (var kitIndex = 0; kitIndex < audioService.kits.length; kitIndex++) {
				for (var sampleIndex = 0; sampleIndex < audioService.kits[kitIndex].length-1; sampleIndex++) {
					totalSamples++;
					getAndDecodeSamples(audioService.kits[kitIndex][sampleIndex]);
				}
			}

			audioService.loadKit(audioService.kitIndex);
			audioService.clickTrackPlayer();
		}

		function keyDownEvent(e,args){
			switch (args.keyCode) {
				case 32 :
					audioService.playing = !audioService.playing;
					audioService.playing ? audioService.node.stopper.connect(audioService.fx.tremolo.input) : audioService.node.stopper.disconnect();
					break;
				case 65 : audioService.fx.tremolo.bypass = !audioService.fx.tremolo.bypass;       break;
				case 83 : audioService.fx.delay.bypass = !audioService.fx.delay.bypass;           break;
				case 68 : audioService.fx.bitcrusher.bypass = !audioService.fx.bitcrusher.bypass; break;
			}
		}

		function switchKitTemplateIndex(index) {
			//get current synth data
			let data = {
				bitcrusher:{
					bypass:audioService.fx.bitcrusher.bypass,
					bits:audioService.fx.bitcrusher.bits,
					bufferSize:audioService.fx.bitcrusher.bufferSize,
					normFreq:audioService.fx.bitcrusher.normFreq
				},
				delay:{
					bypass:audioService.fx.delay.bypass,
					wetLevel:audioService.fx.delay.wetLevel.value,
					dryLevel:audioService.fx.delay.dryLevel.value,
					feedback:audioService.fx.delay.feedback.value,
					delayTime:audioService.fx.delay.delayTime.value,
					cutoff:audioService.fx.delay.cutoff.value
				},
				tremolo:{
					bypass:audioService.fx.tremolo.bypass,
					intensity:audioService.fx.tremolo.intensity,
					rate:audioService.fx.tremolo.rate,
					stereoPhase:audioService.fx.tremolo.stereoPhase
				}
			};

			//copy current synth and store, then change index
			audioService.kitTemplates[audioService.kitIndex] = angular.copy(data);
			audioService.kitIndex = index;

			//load new synth template
			audioService.loadKit(index);


			$rootScope.$broadcast("reCalculateDisc");
		}

		function loadKit(index) {
			var template = angular.copy(audioService.kitTemplates[index]);
			audioService.fx.bitcrusher.bypass = template.bitcrusher.bypass;
			audioService.fx.bitcrusher.bits = template.bitcrusher.bits;
			audioService.fx.bitcrusher.bufferSize = template.bitcrusher.bufferSize;
			audioService.fx.bitcrusher.normFreq = template.bitcrusher.normFreq;
			audioService.fx.delay.bypass = template.delay.bypass;
			audioService.fx.delay.wetLevel.value = template.delay.wetLevel;
			audioService.fx.delay.dryLevel.value = template.delay.dryLevel;
			audioService.fx.delay.feedback.value = template.delay.feedback;
			audioService.fx.delay.delayTime.value = template.delay.delayTime;
			audioService.fx.delay.cutoff.value = template.delay.cutoff;
			audioService.fx.tremolo.bypass = template.tremolo.bypass;
			audioService.fx.tremolo.intensity = template.tremolo.intensity;
			audioService.fx.tremolo.rate = template.tremolo.rate;
			audioService.fx.tremolo.stereoPhase = template.tremolo.stereoPhase;
		}

		function clickTrackPlayer() {
			while (nextNoteTime < audioService.audioCtx.currentTime + 0.1 ) {
				nextNoteTime += 1.1 - audioService.spd;
				if (audioService.playing) {
					audioService.clickTrack++;
				}
				if (audioService.clickTrack >= audioService.discLength) {
					audioService.clickTrack = 0;
				}

				if (audioService.playing) {
					for (var i = 0; i < audioService.kit.length-1; i++) {
						if (audioService.kit[i].beats[audioService.clickTrack].active){
							var source = audioService.audioCtx.createBufferSource();
							source.buffer = audioService.kits[audioService.kitIndex][i].buffer;
							source.connect(audioService.node.stopper);
							source.start(0,0,audioService.kits[audioService.kitIndex][i].buffer.duration);
							$rootScope.$broadcast('playSampleEvent',i);
						}
					}
				}
			}
			$rootScope.$broadcast('clickTrackEvent');
			clickPromise = $timeout(audioService.clickTrackPlayer, 25);
		}

		function getAndDecodeSamples(sample) {
			var samplesLoaded = 0;
			var request = new XMLHttpRequest();
			request.open("GET", sample.fileUrl,true);
			request.responseType = "arraybuffer";
			request.onload=function(){
				audioService.audioCtx.decodeAudioData(request.response,
					function(buffer){
						samplesLoaded++;
						sample.buffer = buffer;
						if (samplesLoaded == totalSamples) {
							console.log("ALL SAMPLES BUFFERED");
						}
					},
					function(error) {
						console.log('failed to process: ',sample);
					}
				);
			};
			request.onerror = function(){
				console.log('BufferLoader: XHR error, no request can be made');
			};
			request.send();
		}
	});

angular.module('dataServiceModule', [])
    .service("dataService", function(){

		var dataServiceScope = this;

		// local storage data
		dataServiceScope.storage = JSON.parse(localStorage.getItem('discBeatsLocalStorage'));
		if (dataServiceScope.storage != null) {
			if ('active' in dataServiceScope.storage) {
				if (!dataServiceScope.storage.active){ dataServiceScope.storage = false}
			}
			else {
				dataServiceScope.storage = false;
			}
		}
		else {
			dataServiceScope.storage = false;
		}

	});

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


angular.module('helpWindowModule', [])

    .directive('helpWindow', function () {
        return {
            restrict:'C',
            templateUrl:'CACHE/directives/helpWindow/helpWindow.html',
            replace: true,
            link: function(scope)	{



                scope.preventProp = function(e) {
                    e.stopPropagation();

                }
            }
        }
    });
angular.module('importExportWindowModule', [])

    .directive('importExportWindow', function ($rootScope,audioService) {
        return {
            restrict:'C',
            templateUrl:'CACHE/directives/importExportWindow/importExportWindow.html',
            replace: true,
            link: function(scope)	{

	            scope.textAreaData = '';

	            scope.$on("importExport",function(event,data){
		            scope.textAreaData = data;
	            });

	            scope.preventProp = function(e) {
		            e.stopPropagation();
					scope.importExportWindowVisible = !scope.importExportWindowVisible;
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
angular.module('kitControlsModule', [])

    .directive('kitControls', function (audioService) {
        return {
            restrict:'C',
            templateUrl:'CACHE/directives/kitControls/kitControls.html',
            replace: true,
            link: function(scope) {

                scope.resetIndex = -1;
                scope.audioService = audioService;


            }
        }
    });

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
angular.module('discModule', [])

    .directive('disc', function ($window,$timeout,$rootScope, audioService) {
        return {
            restrict:'C',
            link: function(scope,element)	{

	            var cnv = element[0];
	            var ctx = cnv.getContext("2d");

	            var w, h, rad, midX, midY, angleSize, distanceFromCenter;
	            var centerButtonSize = 100;
	            var centerButtonPadding = 20;
	            var hoverSample,hoverBeat = -1;
	            var centerSize = centerButtonSize + centerButtonPadding;
				var beatAngles = [];

	            function reCalculateDisc() {
		            audioService.kit = audioService.kits[audioService.kitIndex];
		            angleSize =  Math.PI * 2 / audioService.discLength;
		            for (var i = 0; i < audioService.kit.length; i++) {
			            var ring = audioService.kit[i];
			            ring.rad = (rad - centerSize) / (audioService.kit.length-1) * i + centerSize -1;
			            for (var d = 0; d < audioService.discLength; d++) {
				            beatAngles[d] = angleSize * d;
				            ring.beats[d].a1 = angleSize * d;
				            ring.beats[d].a2 = angleSize * (d+1);
				            ring.beats[d].x = midX + (ring.rad) * Math.cos(angleSize * (d));
				            ring.beats[d].y = midY + (ring.rad) * Math.sin(angleSize * (d));
			            }
		            }
		            beatAngles[audioService.discLength] = angleSize * (d+1);
		            drawDisc();
	            }

	            function windowResize() {
		            w = $window.innerWidth;
		            h = $window.innerHeight;
		            cnv.style.width = w +'px';
		            cnv.style.height = h + 'px';
		            midX = (w-scope.menuSize) / 2;
		            midY = h/2;
		            rad = (h/2)-100;
		            angular.element(cnv).attr({width:  w, height: h	});
		            reCalculateDisc();
	            }
	            windowResize();

	            function drawDisc() {
		            if (audioService.kit) {
			            ctx.clearRect(0,0,w,h);
			            ctx.beginPath();
			            ctx.arc(midX,midY,rad,0,Math.PI*2,false);
			            ctx.lineWidth = 1;
			            ctx.strokeStyle = "#000000";
			            ctx.fillStyle = "#FFFFFF";
			            ctx.stroke();
			            ctx.fill();
			            ctx.closePath();

			            for (var bInd1 = 0; bInd1 < audioService.discLength; bInd1++) {
				            for (var sInd1 = 0; sInd1 < audioService.kit.length-1; sInd1++) {

					            var Sind2 = sInd1 == audioService.kit.length-1 ? 0 : sInd1 + 1;
					            var bInd2 = bInd1 == audioService.discLength-1 ? 0 : bInd1 + 1;
					            var p1 = audioService.kit[sInd1].beats[bInd1];
				                var p2 = audioService.kit[Sind2].beats[bInd1];
					            var p3 = audioService.kit[sInd1].beats[bInd2];
					            var p4 = audioService.kit[Sind2].beats[bInd2];

					            ctx.beginPath();
					            ctx.moveTo(p1.x,p1.y);
					            ctx.lineTo(p2.x, p2.y);
					            ctx.arc(midX, midY, audioService.kit[Sind2].rad, p2.a1, p2.a2, false);
					            ctx.lineTo(p3.x,p3.y);
					            ctx.arc(midX, midY, audioService.kit[sInd1].rad, p1.a2, p1.a1, true);



					            if (audioService.kit[sInd1].beats[bInd1].active) { // active cell
						            ctx.lineWidth = 2;
						            ctx.strokeStyle = "#000000  ";
						            ctx.fillStyle = "rgba(100,255,100,0.05)";
					            }
					            else if (sInd1 == hoverSample && hoverBeat == bInd1) { // hover cell
						            ctx.lineWidth = 3;
						            ctx.strokeStyle = "#000000";
						            ctx.fillStyle = "rgba(100,255,100,0.5)";
					            }
					            else if (bInd1 == audioService.clickTrack) { // tempo track
						            ctx.lineWidth = 1;
						            ctx.strokeStyle = "rgba(0,0,0,0.4)";
						            ctx.fillStyle = audioService.playing ? "rgba(100,100,255,0.2)" : "rgba(0,0,0,0.2)";
					            }
					            else {
						            ctx.lineWidth = 1;
						            ctx.strokeStyle = "rgba(0,0,0,0.1)";
						            ctx.fillStyle = "rgba(0,0,0,0)";
					            }
								ctx.stroke();
						        ctx.fill();
					            ctx.closePath();

					            //in circles for active cells
					            if (audioService.kit[sInd1].beats[bInd1].active) {
						            var a = (beatAngles[bInd2] - beatAngles[bInd1]) * bInd1 + (angleSize/2);
						            var r = (audioService.kit[sInd1].rad + audioService.kit[Sind2].rad)/2;
									ctx.beginPath();
						            ctx.lineWidth = 1;
									ctx.strokeStyle = "#FFFFFF";
									ctx.arc(midX + r * Math.cos(a),midY + r * Math.sin(a),10,0,Math.PI*2,false);
									ctx.fillStyle = "rgba(100,255,100,0.8)";
									ctx.fill();
									ctx.stroke();
									ctx.closePath();
					            }
				            }
			            }
		            }

		            //CENTER PLAY BUTTON
		            ctx.beginPath();
		            ctx.fillStyle = audioService.playing ? "rgba(100,100,255,0.5)" : "rgba(0,0,0,0.5)";
		            ctx.arc(midX, midY, centerButtonSize, 0,Math.PI*2, false);
		            ctx.fill();
		            ctx.closePath();

		            ctx.beginPath();
		            ctx.arc(midX, midY, centerButtonSize+ 5, 0,Math.PI*2, false);
		            ctx.lineWidth = 0.5;
		            ctx.strokeStyle = "#FFFFFF";
		            ctx.stroke();
		            ctx.closePath();
		            ctx.beginPath();
		            ctx.font = "50px PlayButton";
		            ctx.fontWeight = "bold";
		            ctx.lineWidth = 50;
		            ctx.textAlign = "center";
		            ctx.textBaseline = 'middle';
		            ctx.fillStyle = "#FFFFFF";
		            ctx.shadowOffsetX = 1;
		            ctx.shadowOffsetY = 1;
		            ctx.shadowBlur = 3;
		            ctx.shadowColor = "#FFFFFF";
		            ctx.fillText(audioService.playing ? 'STOP' : 'Play',midX,midY);
		            ctx.closePath();

		            ctx.shadowOffsetX = 0;
		            ctx.shadowOffsetY = 0;
		            ctx.shadowBlur = 0;
	            }

	            $rootScope.$on('reCalculateDisc',function()  {reCalculateDisc();});
	            $rootScope.$on('windowResizeEvent',function(){windowResize();   });
	            $rootScope.$on('clickTrackEvent',function()  {drawDisc();       });

	            $rootScope.$on('mouseDownEvent',function(e,args){
		            if (distanceFromCenter < centerButtonSize) {
			            audioService.playing = !audioService.playing;

			            if (audioService.playing){
				            audioService.node.masterGain.connect(audioService.node.analyser);
				            audioService.node.masterGain.connect(audioService.audioCtx.destination);
			            }
			            else{
				            audioService.node.masterGain.disconnect();
			            }

			            drawDisc();
		            }
		            else if (distanceFromCenter < rad && distanceFromCenter > centerSize) {
			            if (audioService.kit[hoverSample]) {
				            if (audioService.kit[hoverSample].beats[hoverBeat]) {
					            audioService.kit[hoverSample].beats[hoverBeat].active = !audioService.kit[hoverSample].beats[hoverBeat].active;
					            drawDisc();
				            }
			            }
		            }
	            })

	            $rootScope.$on('mouseMoveEvent',function(e,args){
		            if (audioService.kit) {
			            distanceFromCenter = Math.sqrt( Math.pow(args.clientX - (w - scope.menuSize) / 2, 2) + Math.pow(args.clientY - (h/2), 2) );
			            if (distanceFromCenter < rad && distanceFromCenter > centerSize) {
				            for (var layer = 0; layer < audioService.kit.length-1; layer++) {
					            if (distanceFromCenter > audioService.kit[layer].rad && distanceFromCenter < audioService.kit[layer+1].rad) {
						            hoverSample = layer;
						            break;
					            }
				            }
				            var angle = Math.atan2((h/2) - args.clientY,(w-scope.menuSize) / 2 - args.clientX) + Math.PI;
				            for (var i = 0; i < audioService.discLength; i++) {
					            if (angle > beatAngles[i] && angle < beatAngles[i+1]) {
						            hoverBeat = i;
						            break;
					            }
				            }
				            drawDisc();
			            }
			            else {
				            hoverSample = -1;
				            hoverBeat = -1;
			            }
		            }
	            });

            }
        }
    });
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
angular.module('knobElement', [])

    .directive('knob', function ($timeout) {
        return {
            restrict:'C',
            scope: {
                size: "=size",
                label: "=label",
                callBack: "=callBack",
                minValue: "=minValue",
                maxValue: "=maxValue",
                knobValue: "=knobValue"
            },
            template:'<canvas data-ng-dblclick="resetToOriginal()" data-ng-mousedown="startMovingKnob($event)"></canvas>',
            replace: true,
            link: function(scope,element) {

	            if (typeof scope.knobValue == 'undefined')  {scope.knobValue = 0;}
                if (typeof scope.size == 'undefined')       {scope.size = 40;}
                var startY, originalMouseRotation;
                var rotating = false;
                var panAngleLimit = 160;
                var decimalPercision = 1000;
                var minValue =  typeof scope.minValue   == 'undefined' ? 0 : scope.minValue;
                var maxValue =  typeof scope.maxValue   == 'undefined' ? 1 : scope.maxValue;
                var runCallback = false;
                var size = scope.size;
                var half = scope.size/2;

                $timeout(function() {
                    runCallback = !(typeof scope.callBack == 'undefined');
                },100);

                var resetValue = Math.round(scope.knobValue * decimalPercision) / decimalPercision;
                var cnvs = element[0];
                var ctx = cnvs.getContext("2d");
                cnvs.style.width = size +'px';
                cnvs.style.height = size + 'px';
                angular.element(cnvs).attr({width: size + "px", height: size + "px"});
	            var rotationValue = (scope.knobValue - minValue) / (maxValue - minValue);
	            var lastValue = rotationValue;


                function getKnobValue() {
                    return Math.round(((maxValue - minValue) * rotationValue + minValue) * decimalPercision) / decimalPercision
                }

                function eraseAndDrawCanvas() {
                    ctx.clearRect(0, 0, size, size);
                    if (typeof scope.label != 'undefined') {
                        ctx.beginPath();
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.font = "13px Calibri";
                        ctx.fillText(scope.label, half, half + 4);
                        ctx.closePath();
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(255,255,255,0.8)";
                    ctx.lineWidth = 1;
                    ctx.arc(half,half,half - 3,0,Math.PI*2,false);
                    ctx.stroke();
                    ctx.closePath();
	                ctx.beginPath();
	                ctx.strokeStyle = "rgba(255,255,255,0.3)";
	                ctx.lineWidth = 1;
	                ctx.arc(half,half,half,0,Math.PI*2,false);
	                ctx.stroke();
	                ctx.closePath();

                    ctx.beginPath();
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.lineWidth = 7;
                    ctx.lineCap = "butt";
                    ctx.arc(half,half,half - 10, 0, Math.PI*2 * (rotationValue),false);
                    ctx.stroke();
                    ctx.closePath();
                }
                eraseAndDrawCanvas();

				scope.$watch("knobValue", function(newValue, oldValue){
					if(newValue == oldValue){ return; }
					rotationValue = (scope.knobValue - minValue) / (maxValue - minValue);
                    if (runCallback) {scope.callBack.toRun();}
                    eraseAndDrawCanvas();
				});

				scope.resetToOriginal = function() {
					scope.knobValue = resetValue;
                    if (runCallback) {scope.callBack.toRun();}
                    eraseAndDrawCanvas();
				};

                scope.startMovingKnob = function(event) {
                    rotating = true;
                    startY = event.clientY;
                    originalMouseRotation = rotationValue * panAngleLimit;
                };

                scope.$on('mouseUpEvent', function() {
                    if (rotating) {
                        rotating = false;
                        var newKnob = getKnobValue();
                        if (scope.knobValue != newKnob) {
                            scope.knobValue = getKnobValue();
                            if (runCallback) {scope.callBack.toRun();}
                        }
                        eraseAndDrawCanvas();
                    }
                });


                scope.$on('mouseMoveEvent', function(event,args) {
                    if (rotating) {
                        var mouseRotation = originalMouseRotation + startY - args.clientY;
                        if (mouseRotation < 0) { mouseRotation = 0;}
                        if (mouseRotation > panAngleLimit)    { mouseRotation = panAngleLimit;}
						rotationValue =  (mouseRotation / panAngleLimit);
						if(lastValue != rotationValue){
							scope.knobValue = getKnobValue();
                            if (runCallback) {scope.callBack.toRun();}
                            eraseAndDrawCanvas();
							lastValue = mouseRotation;
						}
                    }
                });
            }
        }
    });
angular.module('sliderHorizontalElement', [])

    .directive('sliderHorizontal', ['$timeout', function($timeout) {
        return {
            restrict:'C',
            scope: {
                currentlyMoving: "=currentlyMoving",
                sliderValue: "=sliderValue",
	            callBack: "=callBack"
            },
            templateUrl:'CACHE/elements/sliderHorizontal/sliderHorizontal.html',
            replace: true,
            link: function(scope,element) {

	            scope.thumbWidth = 8;
	            scope.width = 0;

	            $timeout(function(){
		            scope.width = element[0].getBoundingClientRect().width;
	            });


                var sliding, startX, originalX, newValue;
	            var lastValue = scope.sliderValue;
				var originalValue = scope.sliderValue;
                var xMin = 0;

				scope.resetToOriginal = function() {
					scope.sliderValue = originalValue;
					if (angular.isDefined(scope.callBack)){scope.callBack.toRun(scope.sliderValue);}
				};

	            scope.$on('mouseUpEvent', function() {
		            if (sliding) {
			            if (angular.isDefined(scope.callBack)){scope.callBack.toRun(scope.sliderValue);}
			            sliding = false;
                        scope.currentlyMoving = false;
		            }

	            });

                scope.startMovingSlider = function(event) {
                    scope.currentlyMoving = true;
                    sliding = true;
                    startX = event.clientX;
                    newValue = scope.sliderValue * (scope.width - scope.thumbWidth);
                    originalX = newValue;
                };

	            scope.movePos = function(e) {
		            if (!sliding) {
			            scope.sliderValue = (e.clientX - element[0].getBoundingClientRect().left) / scope.width;
			            scope.startMovingSlider(e);
			            if (angular.isDefined(scope.callBack)){scope.callBack.toRun(scope.sliderValue);}
		            }
	            };

                scope.$on('mouseMoveEvent', function(event, args) {
                    if(sliding){

                        var newLeft = originalX - startX + args.clientX;

                        if(newLeft < xMin)       {newLeft = xMin;        scope.sliderValue = 0;}
                        if(newLeft > scope.width){newLeft = scope.width; scope.sliderValue = 1;}
                        newValue = newLeft;

                        if(lastValue != newValue){
                            scope.sliderValue = ((xMin - newValue) / (xMin - scope.width));
	                        if (angular.isDefined(scope.callBack)){scope.callBack.toRun(scope.sliderValue);}
                            lastValue = newValue;
                        }
                    }
                });


            }
        }
    }]);
