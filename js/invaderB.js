
var InvaderB = function(){

	Invader.apply(this);

	this.createInvader = function(x, y, z){
		'use strict';

		this.addHead( 0, 0, 0);
		this.addComunnicater( 0, 3, 0);
		this.addBall( 0, 6, 0)
		this.addEye( -2, 0, 2);
		this.addEye( 2, 0, 2);
		this.addEar( -5.5, 0, 0, -1.55);
		this.addEar( 5.5, 0, 0, 1.55);

		this._invader.position.set(x, y, z);

		this.setBoundingForms(5.5);
	}

	this.addHead = function(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(2,2,10,10,1,false,20,7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateZ(1.55);

		this._invader.add(_mesh);
	}

	this.addComunnicater = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0.5,0.5,2,2, 1, false, 20, 7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		this._invader.add(_mesh);
	}

	this.addBall = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(2,20,20);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invader.add(_mesh);

	}

	this.addEye = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true});
		_geometry = new THREE.CubeGeometry(1,2,0.5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invader.add(_mesh);
	}

	this.addEar = function(x,y,z,rotate){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 2, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateZ(rotate);

		this._invader.add(_mesh);
	}
}
