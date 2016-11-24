
var Ship = function(){

	MovingObject.apply(this);

	this._ship = this._movingObject;

	var old_changeLighting = this.changeLighting;
	var old_changeSombreamento = this.changeSombreamento;

	this._acceleration = 0.0005;
	this._velocity = 0;

	this._leftEngine = false;
	this._rightEngine = false;

	this._rotateValue = 0;

	this._light;
	this._bullet; 
	this._bullet_shooted = false;

	this._slintensity = 0;
	this._lives;

	this.getLives = function(){
		return this._lives;
	}

	this.turnOnRightEngine = function(){
		this._rightEngine = true;
	}

	this.turnOfRightEngine = function(){
		this._rightEngine = false;
	}

	this.turnOnLeftEngine = function(){
		this._leftEngine = true;
	}

	this.turnOfLeftEngine = function(){
		this._leftEngine = false;
	}

	this.getBullet = function(){
		return this._bullet;
	}

	this.getBulletBoll = function(){
		return this._bullet_shooted;
	}

	this.setBulletFalse = function(){
		this._bullet_shooted = false;
	}

	this.borderColision  = function(left, right){
		this._velocity = 0;
		this._ship.rotateY(-this._rotateValue);
		this._rotateValue = 0;
		if (this._ship.position.x > right)
			this._ship.position.x = right;
		if (this._ship.position.x < left)
			this._ship.position.x = left;

	}

	this.createShip = function(x, y, z, size = 1){

		this._lives = 3;

		this.addBody( 0* size, 0* size, 0* size, size);
		this.addCockpit( 0* size, 12.5* size, 0* size, size);
		this.addLeftWing( -5* size, 10* size, 4* size, size);
		this.addRightWing( 5* size, 10* size, 4* size, size);
		this.addTopWing( 0* size, 10* size, 4* size,size);
		/*this.addEngine( 2.5, -10, 0);
		this.addEngine( -2.5, -10, 0);*/

		this._ship.position.set(x, y, z);

		this.setBoundingForms(12.5);
	}

	this.addBody = function(x, y, z, size){
		'use strict';
		var geom = new THREE.Geometry(); 
		var v1 = new THREE.Vector3(-5,10,4);
		var v2 = new THREE.Vector3(5,10,4);
		var v3 = new THREE.Vector3(-5,-10,4);		
		var v4 = new THREE.Vector3(5,-10,4);
		var v5 = new THREE.Vector3(-5,10,-4);
		var v6 = new THREE.Vector3(5,10,-4);
		var v7 = new THREE.Vector3(-5,-10,-4);		
		var v8 = new THREE.Vector3(5,-10,-4);


		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);
		geom.vertices.push(v4);
		geom.vertices.push(v5);
		geom.vertices.push(v6);
		geom.vertices.push(v7);
		geom.vertices.push(v8);

		geom.faces.push(new THREE.Face3(1,0,2));
		geom.faces.push(new THREE.Face3(2,3,1));
		geom.faces.push(new THREE.Face3(5,7,6));
		geom.faces.push(new THREE.Face3(6,4,5));
		geom.faces.push(new THREE.Face3(7,3,2));
		geom.faces.push(new THREE.Face3(2,6,7));
		geom.faces.push(new THREE.Face3(4,0,1));
		geom.faces.push(new THREE.Face3(1,5,4));
		geom.faces.push(new THREE.Face3(1,3,7));
		geom.faces.push(new THREE.Face3(7,5,1));
		geom.faces.push(new THREE.Face3(2,0,4));
		geom.faces.push(new THREE.Face3(4,6,2));

		geom.computeFaceNormals();

		this._materials.push(new THREE.MeshBasicMaterial({color: 0xcacaca}));
		this._materials.push(new THREE.MeshLambertMaterial({color: 0xcacaca}));
		this._materials.push(new THREE.MeshPhongMaterial({color: 0xcacaca, specular: 0xffffff, shininess: 100}));


		var object = new THREE.Mesh( geom, this._materials[this._materials.length - 2]);

		object.position.set(x, y, z);

		object.scale.set(size, size, size);

		this._ship.add(object);
	}

	this.addEngine = function(x, y, z, size){
		'use strict';
		this._materials.push(new THREE.MeshBasicMaterial({color: 0x0077ee}));
		this._materials.push(new THREE.MeshLambertMaterial({color: 0x0077ee}));
		this._materials.push(new THREE.MeshPhongMaterial({color: 0x0077ee, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.SphereGeometry(10, 10, 10);
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);
		this._mesh.position.set(x, y, z);
		this._mesh.scale.set(0.2*size, 0.2*size, 0.2*size);

		this._ship.add(this._mesh);
	}

	this.addCockpit = function(x, y, z, size){
		'use strict';
		var geom = new THREE.Geometry(); 
		var v1 = new THREE.Vector3(-4,4,2.5);
		var v2 = new THREE.Vector3(4,4,2.5);
		var v3 = new THREE.Vector3(-4,-4,2.5);		
		var v4 = new THREE.Vector3(4,-4,2.5);
		var v5 = new THREE.Vector3(-2,2,-2.5);
		var v6 = new THREE.Vector3(2,2,-2.5);
		var v7 = new THREE.Vector3(-2,-2,-2.5);		
		var v8 = new THREE.Vector3(2,-2,-2.5);


		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);
		geom.vertices.push(v4);
		geom.vertices.push(v5);
		geom.vertices.push(v6);
		geom.vertices.push(v7);
		geom.vertices.push(v8);

		geom.faces.push(new THREE.Face3(1,0,2));
		geom.faces.push(new THREE.Face3(2,3,1));
		geom.faces.push(new THREE.Face3(5,7,6));
		geom.faces.push(new THREE.Face3(6,4,5));
		geom.faces.push(new THREE.Face3(7,3,2));
		geom.faces.push(new THREE.Face3(2,6,7));
		geom.faces.push(new THREE.Face3(4,0,1));
		geom.faces.push(new THREE.Face3(1,5,4));
		geom.faces.push(new THREE.Face3(1,3,7));
		geom.faces.push(new THREE.Face3(7,5,1));
		geom.faces.push(new THREE.Face3(2,0,4));
		geom.faces.push(new THREE.Face3(4,6,2));

		geom.computeFaceNormals();

		this._materials.push(new THREE.MeshBasicMaterial({color: 0xcacaca}));
		this._materials.push(new THREE.MeshLambertMaterial({color: 0xcacaca}));
		this._materials.push(new THREE.MeshPhongMaterial({color: 0xcacaca, specular: 0xffffff, shininess: 100}));

		var object = new THREE.Mesh( geom, this._materials[this._materials.length - 2]);
		var axis = new THREE.Vector3(1, 0, 0);
		object.rotateOnAxis(axis, Math.PI/2);
		object.position.set(x, y, z);

		object.scale.set(size,size,size);

		this._ship.add(object);
	}

	this.addLeftWing = function(x, y, z, size){
		'use strict';
		var object = this.buildWing();
		var axis = new THREE.Vector3(0, 1, 0);
		object.rotateOnAxis(axis, -5*Math.PI/4);
		object.position.set(x+0.5, y, z-0.5);

		object.scale.set(size,size,size);

		this._ship.add(object);
	}


	this.addRightWing = function(x, y, z, size){
		'use strict'; 
		var object = this.buildWing();
		var axis = new THREE.Vector3(0, 1, 0);
		object.rotateOnAxis(axis, Math.PI/4);
		object.position.set(x-0.5,y,z-0.5);

		object.scale.set(size,size,size);

		this._ship.add(object);
	}

	this.addTopWing = function(x, y, z, size){
		'use strict';
		var object = this.buildWing();
		var axis = new THREE.Vector3(0, 1, 0);
		object.rotateOnAxis(axis, -Math.PI/2);
		object.position.set(x, y, z);

		object.scale.set(size,size,size);

		this.buildSpotlight(x,y,z,object);

		this._ship.add(object);
	}


	this.buildSpotlight = function(x, y, z, obj){
		this._light = new THREE.SpotLight(0xFFFFFF, this._slintensity, 100, 45);
		this._light.position.set(x+25,y-30,z);
		this._light.target.position.set(x,y,z);
		this._light.target.updateMatrixWorld();
		obj.add(this._light);
	}

	this.turnOnSpotlight = function(){
		this._slintensity = 5;
		this._light.intensity = this._slintensity;
	}
	this.turnOffSpotlight = function(){
		this._slintensity = 0;
		this._light.intensity = this._slintensity;
	}

	this.buildWing = function(){
		var geom = new THREE.Geometry(); 
		var v1 = new THREE.Vector3(0,0,0.5);
		var v2 = new THREE.Vector3(10,-10,0.5);
		var v3 = new THREE.Vector3(0,-20,0.5);
		var v4 = new THREE.Vector3(10,-20,0.5);		
		var v5 = new THREE.Vector3(0,0,-0.5);
		var v6 = new THREE.Vector3(10,-10,-0.5);	
		var v7 = new THREE.Vector3(0,-20,-0.5);
		var v8 = new THREE.Vector3(10,-20,-0.5);	


		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);
		geom.vertices.push(v4);
		geom.vertices.push(v5);
		geom.vertices.push(v6);
		geom.vertices.push(v7);
		geom.vertices.push(v8);

		geom.faces.push(new THREE.Face3(1,0,2));
		geom.faces.push(new THREE.Face3(2,3,1));
		geom.faces.push(new THREE.Face3(5,7,6));
		geom.faces.push(new THREE.Face3(6,4,5));
		geom.faces.push(new THREE.Face3(7,3,2));
		geom.faces.push(new THREE.Face3(2,6,7));
		geom.faces.push(new THREE.Face3(4,0,1));
		geom.faces.push(new THREE.Face3(1,5,4));
		geom.faces.push(new THREE.Face3(1,3,7));
		geom.faces.push(new THREE.Face3(7,5,1));
		geom.faces.push(new THREE.Face3(2,0,4));
		geom.faces.push(new THREE.Face3(4,6,2));

		geom.computeFaceNormals();

		this._materials.push(new THREE.MeshBasicMaterial({color: 0xaa5555}));
		this._materials.push(new THREE.MeshLambertMaterial({color: 0xaa5555}));
		this._materials.push(new THREE.MeshPhongMaterial({color: 0xaa5555, specular: 0xffffff, shininess: 100}));

		return new THREE.Mesh( geom, this._materials[this._materials.length - 2]);
	}

	this.shoot = function(){
		if (this._bullet_shooted == false){
			this._bullet = new Bullet();

			this._bullet.createBullet(this._ship.position.x, this._ship.position.y + 6, this._ship.position.z);
			this._bullet_shooted = true;

			return true;
		}
		else
			return false;
	}

	// SHIP MOVEMENT

	this.move = function(){
		if(this._leftEngine){
			if (this._velocity > 0)
				this._velocity = 0;
			this.moveLeft();
		}
		if(this._rightEngine){
			if (this._velocity < 0)
				this._velocity = 0;
			this.moveRight();
		}
		this.moveInercia();
	}

	this.moveLeft = function(){
		if (this._rotateValue >= 0){
			if (this._rotateValue > 0)
				this._ship.rotateY(-0.15);
			this._rotateValue = -0.15
			this._ship.rotateY(this._rotateValue);
		}
		if (this._velocity > -0.6)
			this._velocity -= this._acceleration * delta;
		this.moveShip();
	}

	this.moveRight = function(){
		if (this._rotateValue <= 0){
			if (this._rotateValue < 0)
				this._ship.rotateY(0.15);
			this._rotateValue = 0.15
			this._ship.rotateY(this._rotateValue);
		}
		if (this._velocity < 0.6)
			this._velocity += this._acceleration * delta;
		this.moveShip();
	}

	this.moveInercia = function(){
		if (this._velocity > 0.005){
			this._velocity -= (this._acceleration/3 * delta) ;
			this.moveShip();
		}

		else if (this._velocity < -0.005){
			this._velocity += (this._acceleration/3 * delta) ;
			this.moveShip();
		}
		else{
			this._velocity = 0;
			this._ship.rotateY(-this._rotateValue);
			this._rotateValue = 0;
		}
	}

	this.moveShip = function(){
		this._ship.position.x += this._velocity;
		this._ship.position.set(this._ship.position.x, this._ship.position.y, this._ship.position.z);
	}

	this.collidesWith = function(){
		this._velocity = 0;
		if(this._lives == 3){
			scene_lives.remove(board_lives._children[2].getObject());
			this._lives -= 1;
		}
		else if(this._lives == 2){
			scene_lives.remove(board_lives._children[1].getObject());
			this._lives -= 1;
		}
		else if(this._lives == 1){
			scene_lives.remove(board_lives._children[0].getObject());
			this._lives -= 1;
		}
		

	}

	this.changeLighting = function(){
		if(this._bullet_shooted)
			this._bullet.changeLighting();
		old_changeLighting.call(this);
	}

    this.changeSombreamento = function(gouraud){
    	if(this._bullet_shooted)
			this._bullet.changeSombreamento(gouraud);
		old_changeSombreamento.call(this, gouraud);
    }
}

