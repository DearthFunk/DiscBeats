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