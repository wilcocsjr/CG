var _ball;
var _material, _geometry, _mesh;
var _x, _y, _z, _d1, _d2, _d3;

class Ball{

	constructor(){}

	createBall(x, y, z, d1, d2, d3){
		'use strict';
		_x = x;
		_y = y;
		_z = z;
		_d1 = d1;
		_d2 = d2;
		_d3 = d3;

		_ball = new THREE.Object3D();
		_ball.userData = { jumping:true, step:0};

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(_d1, _d2, _d3); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_ball.add(_mesh);
		_ball.position.set(_x, _y, _z);
		_ball.rotateX(1);


		return _ball;
	}

}
