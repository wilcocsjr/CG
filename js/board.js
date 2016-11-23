var ship;

var Board = function(){
	var shipLeft, shipRight, shipMid;
	
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

	this.getNumberOfAliens = function(){
		return this._children.length - 1;
	}

	this.createBoard = function(){
        'use strict';
        var geo_floor = new THREE.CubeGeometry(1500, 1500, 0);
        var texture_floor = new THREE.TextureLoader().load("textures/stars.jpg");
        texture_floor.wrapS = THREE.RepeatWrapping;
        texture_floor.wrapT = THREE.RepeatWrapping;
        texture_floor.repeat.set( 4, 4 );
        //texture = THREE.ImageUtils.loadTexture('http://i683.photobucket.com/albums/vv193/livingdead0666/animations/starfield.gif', {}, function() {renderer.render(scene);});
		var mesh_floor = new THREE.Mesh(geo_floor, new THREE.MeshBasicMaterial({map: texture_floor}));

		mesh_floor.position.set(0, 0, -100);
        mesh_floor.rotateX(10);
        
		scene.add(mesh_floor);
        
		this.addBoard();

	}

	this.createBoardLives = function(){
        'use strict';
        var geo_floor = new THREE.CubeGeometry(1500, 1500, 0);
		this.addBoardLives();

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

	this.removeShipLeft = function(){

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

	this.cleanBoardLives = function(){
			scene_lives.remove(this._children[0].getObject());
			scene_lives.remove(this._children[1].getObject());
			scene_lives.remove(this._children[2].getObject());
			board_lives._children = [];
		
	}

	this.restartBoard = function(){
		this.cleanBoard();
		this.createBoard();
		board_lives.cleanBoardLives();
		board_lives.createBoardLives();
		
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

	this.addBoardLives = function(){
		'use strict';

		shipLeft = new Ship();
		shipLeft.createShip(-120, -80, 0, 4);
		scene_lives.add(shipLeft.getObject());
		this._children.push(shipLeft);

		shipMid = new Ship();
		shipMid.createShip(0, -80, 0, 4);
		scene_lives.add(shipMid.getObject());
		this._children.push(shipMid);

		shipRight = new Ship();
		shipRight.createShip(120, -80, 0, 4);
		scene_lives.add(shipRight.getObject());
		this._children.push(shipRight);

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

	this.gameEnd = function(){
		if (this.getShip().getLives() == 0 || this.getNumberOfAliens() == 0)
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
