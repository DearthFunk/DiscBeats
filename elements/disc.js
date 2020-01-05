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