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