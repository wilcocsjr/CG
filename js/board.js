
var ship;

var Board = function(){
	
	this._children = []; 

	this._leftBorder = -100; // this._leftBorder = - window.innerWidth >> 3; // Dividir por 8
	this._rightBorder = 100; // this._rightBorder = - this._leftBorder;

	this._topBorder = 100;
	this._botBorder = -100;

	this.getChildren = function(){
		return this._children;
	}

	this.getShip = function(){
		return this._children[0];
	}

	this.createBoard = function(){
		this.addBoard();

	}

	this.getChild = function(i){
		return this._children[i];
	}

	this.getChildObject = function(i){
		return this._children[i].getObject();
	}

	this.removeChild = function(i){
		return this._children.splice(i, 1);
	}

	this.getNumberOfChildren = function(){
		return this._children.length;
	}

	//FIXME RESIZE
	this.resize = function(){
		this._leftBorder = - window.innerWidth >> 3; // Dividir por 8
		this._rightBorder = - this._leftBorder;
	}

	this.cleanBoard = function(){
		while (this._children.length > 0){
			scene.remove(this._children[0].getObject());
			this._children.shift();
		}
		if(scene.children.length > 0)
			scene.remove(scene.children[0]);
	}

	this.restartBoard = function(){
		this.cleanBoard();
		this.createBoard();
	}

	this.addBoard = function(){
		'use strict';

		var invader;

		ship = new Ship();
		ship.createShip(0, -80, 0)
		scene.add(ship.getObject());
		this._children.push(ship);

		for (var i = 0; i < 4; i++){

			invader = new InvaderA();
			invader.createInvader(-30 + 20 * i, 20, 0);
			scene.add(invader.getObject());
			this._children.push(invader);

			invader = new InvaderB();
			invader.createInvader(-30 + 20 * i, 0, 0);
			scene.add(invader.getObject());
			this._children.push(invader);
		}
	}

	this.aliensMove = function(){
		'use strict';
		for(var i = 1; i < this.getNumberOfChildren(); i++){
			this._children[i].move();
		}
	}

	this.aliensInLimits = function(){
		for(var i = 1; i < this.getNumberOfChildren(); i++){
			if (this.getChildObject(i).position.x >= 100 || this.getChildObject(i).position.x <= -100){
				this.getChild(i).reflectDirectionSides();
            }
            else if(this.getChildObject(i).position.y <= -60 || this.getChildObject(i).position.y >= 90){
                this.getChild(i).reflectDirection();
			}
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