var _cube;
var _cubematerial, _cubegeometry, _cubemesh;
var _cubex, _cubey, _cubez, _d1, _d2, _d3;

class Cube{

	constructor(){}

	createCube(x, y ,z, d1, d2, d3){
		'use strict';
		_cubex = x;
		_cubey = y;
		_cubez = z;
		_d1 = d1;
		_d2 = d2;
		_d3 = d3;

		_cube = new THREE.Object3D();
			
		_cubegeometry = new THREE.CubeGeometry(_d1, _d2, _d3);
		_cubematerial = new THREE.MeshBasicMaterial({color:0x004e00, wireframe:true});
		_cubemesh = new THREE.Mesh(_cubegeometry, _cubematerial);

		_cube.add(_cubemesh);
		_cube.position.set(_cubex, _cubey, _cubez);

		return _cube;
	}

}