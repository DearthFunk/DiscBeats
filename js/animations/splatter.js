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