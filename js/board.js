
var ship;

var Board = function(){
	
	this._children = []; 

	this._leftBorder = -100; // this._leftBorder = - window.innerWidth >> 3; // Dividir por 8
	this._rightBorder = 100; // this._rightBorder = - this._leftBorder;

	this._topBorder = 90;
	this._botBorder = -90;

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
		ship.createShip(0, -80, 0);
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

	this.shipMove = function(camera3){
		if(this.x_Limits(board.getShip().getObject())){
			this.getShip().move();
			camera_3.position.x = this.getShip().getObject().position.x;
		}
		else
			this.getShip().borderColision(this._leftBorder, this._rightBorder);
	}

	this.aliensMove = function(){
		'use strict';
		for(var i = 1; i < this.getNumberOfChildren(); i++){
			this._children[i].move();
		}
		this.aliensInLimits();
	}

	this.aliensInLimits = function(){
		for(var i = 1; i < this.getNumberOfChildren(); i++){
			if (!this.x_Limits(this.getChildObject(i)) && !this.y_Limits(this.getChildObject(i))){
				scene.remove(this.getChildObject(i));
				this.removeChild(i);
			}
			else if(!this.x_Limits(this.getChildObject(i)))
				this.getChild(i).reflectDirectionSides();

            else if(!this.y_Limits(this.getChildObject(i)))
                this.getChild(i).reflectDirection();
		}
	}

	this.x_Limits = function(object){
		if (object.position.x <= this._rightBorder && object.position.x >= this._leftBorder)
			return true;
		else
			return false;
	}

	this.y_Limits = function(object){
		if (object.position.y <= this._topBorder && object.position.y >= this._botBorder)
			return true;
		else
			return false;
	}

	this.changeWireframe = function(){
		for(var i = 0; i < this._children.length; i++){
			this._children[i].changeWireframe();
		}
	}

	this.changeLighting = function(lighting, gouraud){
		if(lighting)
			for(var i = 0; i < this._children.length; i++){
				this._children[i].changeLighting();
			}
		else
			for(var i = 0; i < this._children.length; i++){
				this._children[i].changeSombreamento(gouraud);
			}
	}

	this.changeSombreamento = function(gouraud){
		for(var i = 0; i < this._children.length; i++){
				this._children[i].changeSombreamento(gouraud);
			}
	}
}