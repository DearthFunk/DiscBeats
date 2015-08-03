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