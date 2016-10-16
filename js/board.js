
var ship;

var Board = function(){
	
	this._children = []; // Vai substituir o obj do ficheiro proj.js

	this._invaderA;
	this._invaderB;

	this._leftBorder = -150;
	this._rightBorder = 150;

	this._topBorder = 80;

	this.getChildren = function(){
		return this._children;
	}

	this.getShip = function(){
		return this._children[0];
	}

	this.createBoard = function(){
		this.addBoard();

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