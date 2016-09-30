var _cylinder;
var _material, _geometry, _mesh;
var _x, _y, _z, _d1, _d2, _d3, _d4;

class Cylinder{

	constructor(){}

	createCylinder(x, y, z, d1, d2, d3, d4){
		'use strict';
		_x = x;
		_y = y;
		_z = z;
		_d1 = d1;
		_d2 = d2;
		_d3 = d3;
		_d4 = d4;

		_cylinder = new THREE.Object3D();

		_material = new THREE.MeshBasicMaterial({color:0xaf0000, wireframe:true});
		_geometry = new THREE.CylinderGeometry(_d1, _d2, _d3, _d4, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_cylinder.add(_mesh);
		_cylinder.position.set(_x, _y, _z);

		_cylinder.rotateX(1.57079633);

		return _cylinder;
	}

	createMouth(x, y ,z, d1, d2, d3, d4){
		'use strict';
		_x = x;
		_y = y;
		_z = z;
		_d1 = d1;
		_d2 = d2;
		_d3 = d3;
		_d4 = d4;

		_cylinder = new THREE.Object3D();

		_material = new THREE.MeshBasicMaterial({color:0xa1e1e1e, wireframe:true});
		_geometry = new THREE.CylinderGeometry(_d1, _d2, _d3, _d4, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_cylinder.add(_mesh);
		_cylinder.position.set(_x, _y, _z);

		_cylinder.rotateX(1.75);

		return _cylinder;
	}

}