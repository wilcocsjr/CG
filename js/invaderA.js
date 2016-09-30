var ball, cube, pyramid, cylinder, invader;
var _x, _y, _z;

class InvaderA{

	constructor(){}

	createInvaderA(x, y ,z){
	'use strict';
	_x = x;
	_y = y;
	_z = z;


	cube = new Cube();
	scene.add(cube.createCube(_x, _y, _z, 10, 5, 5)); //(5, 2.5, 0, 10, 5, 5)

	pyramid = new Pyramid();
	_x = x + 2.5;
	_y = y + 5;
	_z = z;
	scene.add(pyramid.createPyramid(_x, _y, _z, 0, 1.5, 5, 10)); //(7.5, 7.5, 0, 0, 1.5, 5, 10)
	_x = x - 2.5;
	_y = y + 5;
	_z = z;
	scene.add(pyramid.createPyramid(_x, _y, _z, 0, 1.5, 5, 10)); //(2.5, 7.5, 0, 0, 1.5, 5, 10)

	cylinder = new Cylinder();
	_x = x - 3.5;
	_y = y;
	_z = z + 2.5;
	scene.add(cylinder.createCylinder(_x, _y, _z, 1, 1, 0, 0));   //(1.5, 2.5, 2.5, 1, 1, 0, 0)
	_x = x + 3;
	_y = y;
	_z = z + 2.5;
	scene.add(cylinder.createCylinder(_x, _y, _z, 1, 1, 0, 0));     //(8, 2.5, 2.5, 1, 1, 0, 0)
	_x = x - 1;
	_y = y + 1;
	_z = z + 2.5;
	scene.add(cylinder.createCylinder(_x, _y, _z, 1, 1, 0, 0)); //(3.5, 3.5, 2.5, 1, 1, 0, 0)
	_x = x + 1;
	_y = y + 1;
	_z = z + 2.5;
	scene.add(cylinder.createCylinder(_x, _y, _z, 1, 1, 0, 0)); 			  //(6, 3.5, 2.5, 1, 1, 0, 0)
	_x = x;
	_y = y - 1.5;
	_z = z + 2.5;
	scene.add(cylinder.createMouth(_x, _y, _z, 1, 1, 0, 0));					  //(5, 1, 2.5, 1, 1, 0, 0)

	ball = new Ball();
	_x = x - 4.25;
	_y = y;
	_z = z;
	scene.add(ball.createBall(_x, _y, _z, 2, 10, 10)); //(0.75, 2.5, 0, 2, 10, 10)
	_x = x + 4.75;
	_y = y;
	_z = z;
	scene.add(ball.createBall(_x, _y, _z, 2, 10, 10)); //(9.75, 2.5, 0, 2, 10, 10)
    
	}
}