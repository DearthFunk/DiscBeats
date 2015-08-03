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