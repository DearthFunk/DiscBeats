angular.module('audioServiceModule', [])
	.service("audioService", function($window,$timeout,$rootScope, dataService){

		var audioService = this;
		var audioCtx = typeof AudioContext !== 'undefined' ?	new AudioContext() : typeof webkitAudioContext !== 'undefined' ? new webkitAudioContext() :	null;
		var nextNoteTime = audioCtx.currentTime;
		var tuna = new Tuna(audioCtx);
		var clickPromise;
		var totalSamples = 0;



		audioService.kitTemplates =   angular.isObject(dataService.storage) ? dataService.storage.kitTemplates :
			[
				{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:true,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:100}},
				{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:30}},
				{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.718999981880188,dryLevel:1,feedback:0.593999981880188,delayTime:121.9749984741211,cutoff:20000},tremolo:{bypass:true,intensity:0.831,rate:0.594,stereoPhase:0}},
				{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:true,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:180}},
				{bitcrusher:{bypass:true,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:1,dryLevel:0,feedback:0.6940000057220459,delayTime:16.975000381469727,cutoff:3752.875},tremolo:{bypass:true,intensity:0.875,rate:1,stereoPhase:0}},
				{bitcrusher:{bypass:false,bits:4,bufferSize:4096,normFreq:0},delay:{bypass:false,wetLevel:0.5,dryLevel:1,feedback:0.44999998807907104,delayTime:0.10000000149011612,cutoff:20000},tremolo:{bypass:true,intensity:0.3,rate:5,stereoPhase:0}}
			]
		;
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

		$rootScope.$on('keyDownEvent',function(e,args){
			switch (args.keyCode) {
				case 32 :
					audioService.playing = !audioService.playing;
					audioService.playing ? audioService.node.stopper.connect(audioService.fx.tremolo.input) : audioService.node.stopper.disconnect();
					break;
				case 65 : audioService.fx.tremolo.bypass = !audioService.fx.tremolo.bypass;       break;
				case 83 : audioService.fx.delay.bypass = !audioService.fx.delay.bypass;           break;
				case 68 : audioService.fx.bitcrusher.bypass = !audioService.fx.bitcrusher.bypass; break;
			}
		});


		audioService.node.stopper = audioCtx.createGain();
		audioService.node.masterGain = audioCtx.createGain();
		audioService.node.masterGain.gain.value = angular.isObject(dataService.storage) ? dataService.storage.vol : 0.5;
		audioService.node.javascript = audioCtx.createScriptProcessor(1024, 0, 1);
		audioService.node.analyser = audioCtx.createAnalyser();

		audioService.fx.tremolo = new tuna.Tremolo();
		audioService.fx.delay = new tuna.Delay();
		audioService.fx.bitcrusher = new tuna.Bitcrusher();

		audioService.node.stopper.connect   (audioService.fx.tremolo.input);
		audioService.fx.tremolo.connect   (audioService.fx.delay.input);
		audioService.fx.delay.connect     (audioService.fx.bitcrusher.input);
		audioService.fx.bitcrusher.connect(audioService.node.masterGain);
		audioService.node.masterGain.connect(audioService.node.analyser);
		audioService.node.masterGain.connect(audioCtx.destination);
		audioService.node.analyser.smoothingTimeConstant = 0.3;
		audioService.node.analyser.fftSize = 1024 / 2;
		audioService.node.analyser.connect(audioService.node.javascript);
		audioService.node.javascript.connect(audioCtx.destination);

		audioService.switchKitTemplate = function(index) {
			//get current synth data
			var data = {
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
		};

		audioService.loadKit = function(index) {
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
		};

		/*----------------------------------------------------------------------------------------CLICK TRACK---------*/
		audioService.clickTrackPlayer = function() {
			while (nextNoteTime < audioCtx.currentTime + 0.1 ) {
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
							var source = audioCtx.createBufferSource();
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
		};

		/*----------------------------------------------------------------------------------------DECODE AUDIO---------*/
		function getAndDecodeSamples(sample) {
			var samplesLoaded = 0;
			var request = new XMLHttpRequest();
			request.open("GET", sample.fileUrl,true);
			request.responseType = "arraybuffer";
			request.onload=function(){
				audioCtx.decodeAudioData(request.response,
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

		for (var kitIndex = 0; kitIndex < audioService.kits.length; kitIndex++) {
			for (var sampleIndex = 0; sampleIndex < audioService.kits[kitIndex].length-1; sampleIndex++) {
				totalSamples++;
				getAndDecodeSamples(audioService.kits[kitIndex][sampleIndex]);
			}
		}

		audioService.loadKit(audioService.kitIndex);
		audioService.clickTrackPlayer();

	});
