
var Ship = function(){

	this._ship = new THREE.Object3D();
	this._material;
	this._geometry;
	this._mesh;

	this._leftEngine = false;
	this._rightEngine = false;
	this._angle = 0;

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

		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(x, y);
		triangleShape.lineTo(x-10, y-10);
		triangleShape.lineTo(x-10, y-20); 
		triangleShape.lineTo(x, y-20); 
		triangleShape.lineTo(x, y);

		var extrudeSettings = {amount: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1};
		_geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
		_mesh = new THREE.Mesh(_geometry, _material);
		
		_mesh.position.set(0, 0, 0);
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.translateZ(7);
		_mesh.rotateOnAxis(axis, -Math.PI/4);
		this._ship.add(_mesh);
	}


	this.addRightWing = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:true});

		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(x, y);
		triangleShape.lineTo(x+10, y-10);
		triangleShape.lineTo(x+10, y-20); 
		triangleShape.lineTo(x, y-20); 
		triangleShape.lineTo(x, y);

		var extrudeSettings = {amount: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1};
		_geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
		_mesh = new THREE.Mesh(_geometry, _material);
		
		_mesh.position.set(0, 0, 0);
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.translateZ(7);
		_mesh.rotateOnAxis(axis, Math.PI/4);
		this._ship.add(_mesh);
	}

	this.addTopWing = function(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xaa5555, wireframe:true});

		var triangleShape = new THREE.Shape();
		triangleShape.moveTo(z, y);
		triangleShape.lineTo(z+10, y-10);
		triangleShape.lineTo(z+10, y-20); 
		triangleShape.lineTo(z, y-20); 
		triangleShape.lineTo(z, y);

		var extrudeSettings = {amount: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1};
		_geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
		_mesh = new THREE.Mesh(_geometry, _material);
		
		_mesh.position.set(0, 0, 0);
		_mesh.translateX(0.5);
		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, -Math.PI/2);
		this._ship.add(_mesh);
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._ship.children.length; i++){
			var object = this._ship.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}

	this.moveLeft = function(){
		if(!this._leftEngine){
			this._leftEngine = true;
		}
	}

	this.moveRight = function(){
		if(!this._rightEngine){
			this._rightEngine = true;
		}
	}

	this.moveShip = function(speed, delta){
		this._ship.position.x += speed * delta;
		this._ship.position.set(this._ship.position.x, this._ship.position.y, this._ship.position.z);
	}
}

