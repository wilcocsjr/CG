
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

	this._bullet; 
	this._bullet_shooted = false;

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

	this.createShip = function(x, y, z){
		'use strict';

		this.addBody( 0, 0, 0);
		this.addCockpit( 0, 12.5, 0);
		this.addLeftWing( -5, 10, 4);
		this.addRightWing( 5, 10, 4);
		this.addTopWing( 0, 10, 4);
		this.addEngine( 2.5, -10, 0);
		this.addEngine( -2.5, -10, 0);

		this._ship.position.set(x, y, z);

		this.setBoundingForms(12.5);
	}

	this.addBody = function(x, y, z){
		'use strict';
		var meshes = [], geometry, material, mesh;

		geometry = new THREE.CubeGeometry(10, 20, 8);
		material = new THREE.MeshLambertMaterial({color: 0xcacaca, wireframe:false});
		mesh = new THREE.Mesh(geometry, material);
		meshes.push(mesh);

		geometry = this.mergeMeshes(meshes);
		mesh = new THREE.Mesh(geometry, material);
		this._ship.add(mesh);

		/*this._material = new THREE.MeshLambertMaterial({color: 0xcacaca, wireframe:false});

		this._geometry = new THREE.CubeGeometry(10, 20, 8);
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		this._mesh.position.set(x, y, z);

		this._ship.add(this._mesh);*/
	}

	this.mergeMeshes = function(meshes) {
	  var combined = new THREE.Geometry();

	  for (var i = 0; i < meshes.length; i++) {
	    meshes[i].updateMatrix();
	    combined.merge(meshes[i].geometry, meshes[i].matrix);
	  }

	  return combined;
	}

	this.addEngine = function(x, y, z){
		'use strict';
		this._material = new THREE.MeshLambertMaterial({color: 0x0077ee, wireframe:false});

		this._geometry = new THREE.SphereGeometry(10, 10, 10);
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		this._mesh.position.set(x, y, z);
		this._mesh.scale.set(0.2, 0.2, 0.2);

		this._ship.add(this._mesh);
	}

	this.addCockpit = function(x, y, z){
		'use strict';
		this._material = new THREE.MeshLambertMaterial({color: 0xcacaca, wireframe:false});

		this._geometry = new THREE.CylinderGeometry(2, 5, 5, 4, false);
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		this._mesh.position.set(x, y, z);

		var axis = new THREE.Vector3(0, 1, 0);
		this._mesh.rotateOnAxis(axis, Math.PI/4);

		this._ship.add(this._mesh);
	}

	this.addLeftWing = function(x, y, z){
		'use strict';
		this._material = new THREE.MeshLambertMaterial({color: 0xaa5555, wireframe:false});

		
		this._geometry = this.buildWing();
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		this._mesh.rotateOnAxis(axis, -5*Math.PI/4);
		this._mesh.position.set(x, y, z);

		this._ship.add(this._mesh);
	}


	this.addRightWing = function(x, y, z){
		'use strict'; 

		/*var geom = new THREE.Geometry(); 
		var v1 = new THREE.Vector3(0,0,0);
		var v2 = new THREE.Vector3(0,10,0);
		var v3 = new THREE.Vector3(10,10,0);

		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);

		geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
		geom.computeFaceNormals();

		var object = new THREE.Mesh( geom, new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:false}) );

		object.rotation.y = -Math.PI * .5;//triangle is pointing in depth, rotate it -90 degrees on Y

		this._ship.add(object);*/
		this._material = new THREE.MeshLambertMaterial({color: 0xaa5555, wireframe:false});

		this._geometry = this.buildWing();
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		this._mesh.rotateOnAxis(axis, Math.PI/4);
		this._mesh.position.set(x-(Math.sqrt(2)/2), y, z-(Math.sqrt(2)/2));

		this._ship.add(this._mesh);
	}

	this.addTopWing = function(x, y, z){
		'use strict';
		this._material = new THREE.MeshLambertMaterial({color: 0xaa5555, wireframe:false});

		this._geometry = this.buildWing();
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		this._mesh.rotateOnAxis(axis, -Math.PI/2);
		this._mesh.position.set(x, y, z);
		this._mesh.translateZ(-0.5);

		this._ship.add(this._mesh);
	}

	this.buildWing = function(){
		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(0, 0);
		triangleShape.lineTo(10, -10);
		triangleShape.lineTo(10, -20); 
		triangleShape.lineTo(0, -20); 
		triangleShape.lineTo(0, 0);
		var extrudeSettings = {amount: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1};
		return new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
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
	}

	this.changeLighting = function(){
		if(this._bullet_shooted)
			this._bullet.changeLighting();
		//old_changeLighting.call(this)
	}

    this.changeSombreamento = function(gouraud){
    	if(this._bullet_shooted)
			this._bullet.changeSombreamento(gouraud);
		//old_changeSombreamento.call(this, gouraud);
    }
}

