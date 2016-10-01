var _invaderA;
var _x1, _y1, _z1;

class InvaderA{

	constructor(){}

	createInvaderA(x, y ,z){
	'use strict';
	_x1 = x;
	_y1 = y;
	_z1 = z;

	this._material;

	this._geometry;

	this._mesh;

	_invaderA = new THREE.Object3D();

	this.addHead(x, y, z);

	this.addHorn(x + 2.5, y + 5, z);

	this.addHorn(x - 2.5, y + 5, z)

	this.addEye(x - 3.5, y, z + 2.5);

	this.addEye(x + 3, y, z + 2.5);

	this.addEye(x - 1, y + 1, z + 2.5);

	this.addEye(x + 1, y + 1, z + 2.5);

	this.addMouth(x, y - 1.5, z + 2.5);

	this.addEar(x - 4.25, y, z, -1.55);

	this.addEar(x + 4.75, y, z, 1.55);

	return _invaderA;
	}

	addHead(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x004e00, wireframe:true})
		_geometry = new THREE.CubeGeometry(10, 5, 5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_invaderA.add(_mesh)
	}

	addHorn(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 5, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		_invaderA.add(_mesh);
	}

	addEye(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xaf0000, wireframe:true});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);
		_mesh.rotateX(1.57079633);

		_invaderA.add(_mesh);
	}

	addMouth(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xa1e1e1e, wireframe:true});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateX(1.75);

		_invaderA.add(_mesh);
	}

	addEar(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(2, 10, 10);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0 , 0, 0);
		_mesh.rotateX(1)
		_mesh.position.set(x, y, z);

		_invaderA.add(_mesh)
	}

}