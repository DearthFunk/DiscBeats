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