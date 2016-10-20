
var ship;

var Board = function(){
	
	this._children = []; // Vai substituir o obj do ficheiro proj.js

	this._invaderA;
	this._invaderB;

	this._leftBorder = -150;
	this._rightBorder = 150;

	this._topBorder = 120;

	this.getChildren = function(){
		return this._children;
	}

	this.getShip = function(){
		return this._children[0];
	}

	this.createBoard = function(){
		this.addBoard();

	}

	this.getChild = function(a){
		return this._children[a].getObject();
	}

	this.removeChild = function(a){
		return this._children.splice(a, 1);
	}

	this.getNumberOfChildren = function(){
		return this._children.length;
	}

	this.cleanBoard = function(){
		while (this._children.length > 0){
			scene.remove(this._children[0].getObject());
			this._children.shift();
		}
	}

	this.restartBoard = function(){
		this.cleanBoard();
		this.createBoard();
	}

	this.addBoard = function(){

		ship = new Ship();
		ship.createShip(0, -40, 0)
		scene.add(ship.getObject());
		this._children.push(ship);

		for (var i = 0; i < 4; i++){

			invaderA = new InvaderA();
			invaderA.createInvaderA(-30 + 20 * i, 20, 0);
			scene.add(invaderA.getObject());
			this._children.push(invaderA);

			invaderB = new InvaderB();
			invaderB.createInvaderB(-30 + 20 * i, 0, 0);
			scene.add(invaderB.getObject());
			this._children.push(invaderB);
		}
	}

	this.shipInLimits = function(){
		if (this._children[0].getObject().position.x <= this._rightBorder && this._children[0].getObject().position.x >= this._leftBorder)
			return true;
		else{
			this._children[0].borderColision(this._leftBorder, this._rightBorder);
			return false;
		}
	}

	this.bulletInLimits = function(){
		if (this.getShip().getBullet().getObject().position.y < this._topBorder)
			return true;
		else
			return false;
	}

	this.changeWireframe = function(){
		for(var i = 0; i < this._children.length; i++){
			this._children[i].changeWireframe();
		}
	}
}