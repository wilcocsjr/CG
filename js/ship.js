
var Ship = function(){

	this._ship = new THREE.Object3D();
	this._material;
	this._geometry;
	this._mesh;

	this._acceleration = 0;
	this._velocity = 0;

	this._rotateValue = 0;

	this.getObject = function(){
		return this._ship;
	}

	this.createShip = function(x, y, z){
		'use strict';

		this.addBody(x, y, z);
		this.addCockpit(x, y + 12.5, z);
		this.addLeftWing(x - 5, y + 10, z + 4);
		this.addRightWing(x + 5, y + 10, z + 4);
		this.addTopWing(x, y + 10, z + 4);
		this.addEngine(x + 2.5, y - 10, z);
		this.addEngine(x - 2.5, y - 10, z);
		this._ship.position.set(x, y, z);
	}

	this.addBody = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xcacaca, wireframe:true});

		_geometry = new THREE.CubeGeometry(10, 20, 8);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);

		this._ship.add(_mesh);
	}

	this.addEngine = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0x0077ee, wireframe:true});

		_geometry = new THREE.SphereGeometry(10, 10, 10);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);
		_mesh.scale.set(0.2, 0.2, 0.2);

		this._ship.add(_mesh);
	}

	this.addCockpit = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xcacaca, wireframe:true});

		_geometry = new THREE.CylinderGeometry(2, 5, 5, 4, false);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);

		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, Math.PI/4);

		this._ship.add(_mesh);
	}

	this.addLeftWing = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:true});

		
		_geometry = this.buildWing();
		_mesh = new THREE.Mesh(_geometry, _material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, -5*Math.PI/4);
		_mesh.position.set(x, y, z);
		this._ship.add(_mesh);
	}


	this.addRightWing = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:true});

		_geometry = this.buildWing();
		_mesh = new THREE.Mesh(_geometry, _material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, Math.PI/4);
		_mesh.position.set(x-(Math.sqrt(2)/2), y, z-(Math.sqrt(2)/2));
		this._ship.add(_mesh);
	}

	this.addTopWing = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:true});

		_geometry = this.buildWing();
		_mesh = new THREE.Mesh(_geometry, _material);
		
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, -Math.PI/2);
		_mesh.position.set(x, y, z);
		_mesh.translateZ(-0.5);
		this._ship.add(_mesh);
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

	this.changeWireframe = function(){

		for(var i=0; i < this._ship.children.length; i++){
			var object = this._ship.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}

	this.moveLeft = function(){
		if (this._rotateValue >= 0){
			if (this._rotateValue > 0)
				this._ship.rotateY(-0.15);
			this._rotateValue = -0.15
			this._ship.rotateY(this._rotateValue);
		}
		this._acceleration -= 0.006;
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
		this._acceleration += 0.006;
		this._velocity += this._acceleration * delta;
		this.moveShip();
	}

	this.moveInercia = function(){
		if (this._velocity > 0.005){
			this._acceleration -= 0.00035;
			this._velocity = this._acceleration * delta;
			this.moveShip();
		}

		else if (this._velocity < -0.005){
			this._acceleration += 0.00035;
			this._velocity = this._acceleration * delta;
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
}

