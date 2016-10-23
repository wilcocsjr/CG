
var Invader = function(){

	MovingObject.apply(this);

	this._invader = this._movingObject;
	this._invader.direction = CreateDir();

	this._velocity = 0.5;

	this.createInvader = function(x, y, z){
		throw new Error('Cannot call abstract class \"Invader\" ');
	}

	this.move = function(dir){
		var dir = this._invader.direction;
		if (0 < dir < (Math.PI / 2)){
			this._invader.position.x += Math.cos(dir)/2;
			this._invader.position.y += Math.sin(dir)/2;
		}
		else if ((Math.PI / 2) < dir < Math.PI){
			this._invader.position.x -= Math.cos(dir)/2;
			this._invader.position.y += Math.sin(dir)/2;
		}
		else if (Math.PI < dir < (3 * Math.PI)/2){
			this._invader.position.x -= Math.cos(dir)/2;
			this._invader.position.y -= Math.sin(dir)/2;
		}
		else if ((3 * Math.PI)/2 < dir < 2* Math.PI){
			this._invader.position.x += Math.cos(dir)/2;
			this._invader.position.y -= Math.sin(dir)/2;
		}
		else if (dir = 0){
			this._invader.position.x += this._velocity;
		}
		else if (dir = Math.PI / 2){
			this._invader.position.y += this._velocity;
		}
		else if (dir = Math.PI){
			this._invader.position.x -= this._velocity;
		}
		else if (dir = (3*Math.PI)/2){
			this._invader.position.y -= this._velocity;
		}

		this._invader.position.set(this._invader.position.x, this._invader.position.y, this._invader.position.z);
	}

	function RandomNum(min, max) {
  		return Math.random() * (max - min) + min;
	}	

	function CreateDir(){
		dir = (RandomNum(0, 360)* Math.PI) / 180 ; //degrees->radians
		return dir;
	}

	this.reverseDirection = function(){
		this._invader.direction = -this._invader.direction;
	}

}