
var Invader = function(){

	MovingObject.apply(this);

	this._invader = this._movingObject;

	this.createInvader = function(x, y, z){
		throw new Error('Cannot call abstract class \"Invader\" ');
	}

	this.move = function(){}

}