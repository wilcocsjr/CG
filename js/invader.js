
var Invader = function(){

	MovingObject.apply(this);

	this._invader = this._movingObject;
	this._direction = CreateDir();

	this._velocity = 0.4;

	this.createInvader = function(x, y, z){
		throw new Error('Cannot call abstract class \"Invader\" ');
	}

	this.move = function(dir){
		var dir = this._direction;
		if (0 < dir < (Math.PI / 2)){
			this._invader.position.x += Math.cos(dir) * this._velocity;
			this._invader.position.y += Math.sin(dir) * this._velocity;
		}
		else if ((Math.PI / 2) < dir < Math.PI){
			this._invader.position.x -= Math.cos(dir) * this._velocity;
			this._invader.position.y += Math.sin(dir) * this._velocity;
		}
		else if (Math.PI < dir < (3 * Math.PI)/2){
			this._invader.position.x -= Math.cos(dir) * this._velocity;
			this._invader.position.y -= Math.sin(dir) * this._velocity;
		}
		else if ((3 * Math.PI)/2 < dir < 2* Math.PI){
			this._invader.position.x += Math.cos(dir) * this._velocity;
			this._invader.position.y -= Math.sin(dir) * this._velocity;
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

	}

	function RandomNum(min, max) {
  		return Math.random() * (max - min) + min;
	}	

	function CreateDir(){
		var dir = (RandomNum(0, 360)* Math.PI) / 180 ; //degrees->radians
		return dir;
	}

	this.collidesWith = function(){
		this._direction += Math.PI;
		if(this._direction > (2 * Math.PI))
			this._direction -= (2 * Math.PI)
	}

    this.reflectDirection = function(){
		this._direction = (2*Math.PI) - this._direction;
	}
	
	 this.reflectDirectionSides = function(){
		this._direction = (Math.PI) - this._direction;
     }

     this.changeLighting = function(){
     	for(var i=0; i < this._movingObject.children.length - 1; i++){
			var object = this._movingObject.children[i];

			object.material = this._materials[3*i];
     	}
    }

     this.changeSombreamento = function(gouraud){
     	for(var i=0; i < this._movingObject.children.length - 1; i++){
			var object = this._movingObject.children[i];

			if(gouraud == true)
				object.material = this._materials[3 * (i + 1) - 1];
			else
				object.material = this._materials[3 * (i + 1) - 2];
		}
     }
}
