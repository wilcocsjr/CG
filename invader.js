
var Invader = function(){

	MovingObject.apply(this);

	this._invader = this._movingObject;

	this._velocity = 1;


	this.createInvader = function(x, y, z){
		throw new Error('Cannot call abstract class \"Invader\" ');
	}

	this.move = function(){
		dir = (RandomNum(0, 360)* Math.PI) / 180 ; //degrees->radians
		if (0 < dir < 90){
			this._invader.position.x += Math.cos(dir);
			this._invader.position.y += Math.sin(dir);
		}
		if (90 < dir < 180){
			this._invader.position.x -= Math.cos(dir);
			this._invader.position.y += Math.sin(dir);
		}
		if (180 < dir < 270){
			this._invader.position.x -= Math.cos(dir);
			this._invader.position.y -= Math.sin(dir);
		}
		if (270 < dir < 360){
			this._invader.position.x += Math.cos(dir);
			this._invader.position.y -= Math.sin(dir);
		}
		if (dir = 0){
			this._invader.position.x += this._velocity;
		}
		if (dir = 90){
			this._invader.position.y += this._velocity;
		}
		if (dir = 180){
			this._invader.position.x -= this._velocity;
		}
		if (dir = 270){
			this._invader.position.y -= this._velocity;
		}

		this._invader.position.set(this._invader.position.x, this._invader.position.y, this._invader.position.z);
	}

	function RandomNum(min, max) {
  		return Math.random() * (max - min) + min;
	}	

}