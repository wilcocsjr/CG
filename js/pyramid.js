var _pyramid;
var _material, _geometry, _mesh;
var _x, _y, _z, _d1, _d2, _d3, _d4;

class Pyramid{

	constructor(){}

	createPyramid(x, y ,z, d1, d2, d3, d4){
		'use strict';
		_x = x;
		_y = y;
		_z = z;
		_d1 = d1;
		_d2 = d2;
		_d3 = d3;
		_d4 = d4;

		_pyramid = new THREE.Object3D();
			
		_geometry = new THREE.CylinderGeometry(_d1, _d2, _d3, _d4, false);
		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_mesh = new THREE.Mesh(_geometry, _material);

		_pyramid.add(_mesh);
		_pyramid.position.set(_x, _y, _z);

		return _pyramid;
	}

}