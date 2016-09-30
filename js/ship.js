var _ship;
var _material, _geometry, _mesh;
var _x, _y, _z;

class Ship{

	constructor(){}

	createShip(x, y, z){
		'use strict';
		_x = x;
		_y = y;
		_z = z;

		_ship = new THREE.Object3D();

		this.addBody(_x, _y, _z);
		this.addCockpit(_x, _y + 12.5, _z);
		this.addLeftWing(_x - 5, _y + 10, _z + 4);
		this.addRightWing(_x + 5, _y + 10, _z + 4);
		this.addTopWing(_x, _y + 10, _z + 4);
		this.addEngine(_x + 2.5, _y - 10, _z);
		this.addEngine(_x - 2.5, _y - 10, _z);
		_ship.position.set(_x, _y, _z);

		return _ship;
	}

	addBody(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xcacaca, wireframe:true});

		_geometry = new THREE.CubeGeometry(10, 20, 8);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);

		_ship.add(_mesh);
	}

	addEngine(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0x0077ee, wireframe:true});

		_geometry = new THREE.SphereGeometry(10, 10, 10);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);
		_mesh.scale.set(0.2, 0.2, 0.2);

		_ship.add(_mesh);
	}

	addCockpit(x, y, z){
		'use strict';
		_material = new THREE.MeshBasicMaterial({color: 0xcacaca, wireframe:true});

		_geometry = new THREE.CylinderGeometry(2, 5, 5, 4, false);
		_mesh = new THREE.Mesh(_geometry, _material);
		_mesh.position.set(x, y, z);

		var axis = new THREE.Vector3(0, 1, 0);
		_mesh.rotateOnAxis(axis, Math.PI/4);

		_ship.add(_mesh);
	}

	addLeftWing(x, y, z){
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
		_ship.add(_mesh);
	}


	addRightWing(x, y, z){
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
		_ship.add(_mesh);
	}

	addTopWing(x, y, z){
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
		_ship.add(_mesh);
	}

	moveLeft(){
		_x = _x - 5;
		_ship.position.set(_x, _y-80, _z);
	}

	moveRight(){
		_x = _x + 5;
		_ship.position.set(_x, _y-80, _z);
	}
}


